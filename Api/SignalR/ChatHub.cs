using Api.SignalR.Base;
using Application.Handlers.Chats.Queries;
using Ardalis.GuardClauses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Api.SignalR
{
    /// <summary>
    /// Class that represents a SignalR Hub for our Chat feature.
    /// 
    /// </summary>
    [Authorize]
    public class ChatHub : BaseHub
    {
        public ChatHub(IMediator mediator) : base(mediator) { }

        /// <summary>
        /// Logic for when we need to bind the user connection of our Hub, to his respective groups. (UserChatRooms)
        /// 1. Fetch all the UserChatRooms for this user. These will be used as Hub groups.
        /// 2. Foreach UserChatRooms, bind the User connection to each one of them.
        /// </summary>
        /// <returns></returns>
        public async Task AddUserToGroupsAsync()
        {
            Guard.Against.Null(Context.UserIdentifier, nameof(Context.UserIdentifier));

            var userId = Guid.Parse(Context.UserIdentifier);
            var userName = Context.User.FindFirstValue(ClaimTypes.Name);
            var connectionId = Context.ConnectionId;

            var groups = await _mediator.Send(new ListUserChatRooms.Query { UserId = userId });

            if (groups.Value is null) return;

            foreach (var group in groups.Value)
            {
                await Groups.AddToGroupAsync(connectionId, group.Id.ToString());
                await Clients.OthersInGroup(group.Id.ToString()).SendAsync("NewConnection", userName.ToUpper() + " just joined!");
            }

            await Clients.Caller.SendAsync("LinkedToGroups", groups);
        }

        #region overrides

        /// <summary>
        /// When a client connects to our chat hub.
        /// </summary>
        /// <returns>Valid Hub connection to the caller.</returns>
        public override async Task OnConnectedAsync()
        {
            var hubHttpContext = Context.GetHttpContext();

            Guard.Against.Null(hubHttpContext, nameof(hubHttpContext));

            await AddUserToGroupsAsync();
            //await Clients.Caller.SendAsync("Connected", Context.UserIdentifier);
        }

        /// <summary>
        /// When a client disconnects to our chat hub.
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        #endregion
    }
}
