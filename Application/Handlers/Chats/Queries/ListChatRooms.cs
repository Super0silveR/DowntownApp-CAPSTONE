using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Chats.Queries
{
    public class ListChatRooms
    {
        public class Query : IRequest<Result<List<UserChatRoomDto>>?> { }

        public class Handler : IRequestHandler<Query, Result<List<UserChatRoomDto>>?>
        {
            private readonly IDataContext _context;
            private readonly ICurrentUserService _userService;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, ICurrentUserService userService, IMapper mapper)
            {
                _context = context;
                _userService = userService;
                _mapper = mapper;
            }

            public async Task<Result<List<UserChatRoomDto>>?> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userService.GetUserName(), cancellationToken);

                if (user == null) return null;

                var chatRooms = await _context.UserChatRooms
                    .Where(ucr => ucr.UserId == user.Id)
                    .OrderBy(ucr => ucr.LastSent)
                    .ProjectTo<UserChatRoomDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<UserChatRoomDto>>.Success(chatRooms);
            }
        }
    }
}
