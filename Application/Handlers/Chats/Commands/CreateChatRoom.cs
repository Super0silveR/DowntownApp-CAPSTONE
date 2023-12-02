using Application.Common.Interfaces;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Chats.Commands
{
    public class CreateChatRoom
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid RecipientId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.RecipientId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly ICurrentUserService _userService;

            public Handler(IDataContext context, ICurrentUserService userService)
            {
                _context = context;
                _userService = userService;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                var recipient = await _context.Users
                    .FirstOrDefaultAsync(u => u.Id == request.RecipientId, cancellationToken);

                var creator = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userService.GetUserName(), cancellationToken);

                var chatRoomType = await _context.ChatRoomTypes
                    .FirstOrDefaultAsync(crt => crt.Name!.Equals("Private"), cancellationToken);

                if (recipient is null || creator is null || chatRoomType is null) return null;

                ChatRoom chatRoom = new() { ChatRoomType = chatRoomType };

                await _context.ChatRooms.AddAsync(chatRoom, cancellationToken);

                var userChatRooms = new List<UserChatRoom>() {
                    new UserChatRoom { ChatRoomId = chatRoom.Id, UserId = recipient.Id, DisplayName = creator.DisplayName },
                    new UserChatRoom { ChatRoomId = chatRoom.Id, UserId = creator.Id, DisplayName = recipient.DisplayName }
                };

                await _context.UserChatRooms.AddRangeAsync(userChatRooms, cancellationToken);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!success)
                    return Result<Unit>.Failure("Failed to create the conversation.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
