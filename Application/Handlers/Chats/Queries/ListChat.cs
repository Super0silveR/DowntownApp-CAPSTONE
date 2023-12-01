using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Chats.Queries
{
    public class ListChat
    {
        public class Query : IRequest<Result<List<UserChatDto>>>
        {
            public Guid ChatRoomId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserChatDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<UserChatDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userChats = await _context.UserChats
                    .Where(uc => uc.ChatRoomId == request.ChatRoomId)
                    .OrderBy(uc => uc.Sent)
                    .ProjectTo<UserChatDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                foreach ( var (chat, i) in userChats.Select((chat, i) => ( chat, i )))
                {
                    var nextChat = userChats.ElementAtOrDefault(i + 1);

                    if (nextChat == null) 
                        chat.IsLastInGroup = true;
                    else if (chat.UserName!.Equals(nextChat.UserName))
                        chat.IsLastInGroup = false;
                    else
                        chat.IsLastInGroup = true;
                }

                return Result<List<UserChatDto>>.Success(userChats);
            }
        }
    }
}
