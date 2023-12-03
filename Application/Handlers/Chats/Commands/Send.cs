using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Chats.Commands
{
    public class Send
    {
        public class Command : IRequest<Result<UserChatDto>?>
        {
            public string Message { get; set; } = string.Empty;
            public string? ChatRoomId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Message).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<UserChatDto>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _userService;

            public Handler(IDataContext context, IMapper mapper, ICurrentUserService userService)
            {
                _context = context;
                _mapper = mapper;
                _userService = userService;
            }

            public async Task<Result<UserChatDto>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context, nameof(_context));

                var user = await _context.Users
                    .Include(u => u.Photos)
                    .SingleOrDefaultAsync(u => u.UserName == _userService.GetUserName(), cancellationToken);

                var chatRoom = await _context.ChatRooms
                    .FindAsync(new object?[] { Guid.Parse(request.ChatRoomId!) }, cancellationToken);

                if (chatRoom == null) return null;

                var userChat = new UserChat
                {
                    User = user,
                    ChatRoom = chatRoom,
                    Message = request.Message,
                };

                await _context.UserChats.AddAsync(userChat);

                var userChatDto = _mapper.Map<UserChatDto>(userChat);

                userChatDto.IsLastInGroup = true;
                userChatDto.IsMe = true;
                userChatDto.Id = userChat.Id;

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Result<UserChatDto>.Success(userChatDto);
                return Result<UserChatDto>.Failure("Failed to send the message.");
            }
        }
    }
}
