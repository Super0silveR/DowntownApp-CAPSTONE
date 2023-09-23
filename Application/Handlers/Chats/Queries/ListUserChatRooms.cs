using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Chats.Queries
{
    public class ListUserChatRooms
    {
        /// <summary>
        /// Query class representing the data passed to the handler.
        /// </summary>
        public class Query : IRequest<Result<List<ChatRoom>>>
        {
            public Guid UserId { get; set; }
        }

        /// <summary>
        /// Handler class representing the handling of the connection event on our chat hub.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<List<ChatRoom>>>
        {
            private readonly IDataContext _context;

            public Handler(IDataContext context)
            {
                _context = context;
            }

            /// <summary>
            /// The goal is to return a list of ChatRooms that belongs to the requested UserId.
            /// TODO: Reworking the loading of the chats, but right now we fetch all the UserChat for each ChatRoom as well.
            /// </summary>
            /// <param name="request">Query class containing the UserId</param>
            /// <param name="cancellationToken"></param>
            /// <returns>List of ChatRooms.</returns>
            public async Task<Result<List<ChatRoom>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ChatRooms, nameof(_context.ChatRooms));

                var userChatRooms = await _context.ChatRooms
                                                  .Join(
                                                    _context.UserChatRooms,
                                                    cr => cr.Id,
                                                    ucr => ucr.ChatRoomId,
                                                    (cr, ucr) => new { ChatRoom = cr, UserChatRoom = ucr }
                                                  )
                                                  .Where(crucr => crucr.UserChatRoom.UserId == request.UserId)
                                                  .OrderByDescending(crucr => crucr.ChatRoom.Created)
                                                  .Select(crucr => new ChatRoom
                                                  {
                                                      ChatRoomTypeId = crucr.ChatRoom.ChatRoomTypeId,
                                                      Name = crucr.ChatRoom.Name,
                                                      Description = crucr.ChatRoom.Description,
                                                      UserChats = crucr.ChatRoom.UserChats.Select(cr => cr).OrderBy(uc => uc.Sent).ToList()
                                                  })
                                                  .ToListAsync(cancellationToken);

                return Result<List<ChatRoom>>.Success(userChatRooms);
            }
        }
    }
}
