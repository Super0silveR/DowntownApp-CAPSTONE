using Api.SignalR.Base;
using Application.Handlers.Chats.Queries;
using Ardalis.GuardClauses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using SendCommand = Application.Handlers.Chats.Commands.Send.Command;
using ListQuery = Application.Handlers.Chats.Queries.ListChat.Query;

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
        /// .
        /// .
        /// WORK IN PROGRESS.
        [Obsolete("Work in progress")]
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

        /// <summary>
        /// Method that handles the "sending a chat" feature.
        /// 1 - Mediator call for adding chat to the domain, and database.
        /// 2 - Send to all connected user of this group the same message.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        public async Task SendChat(SendCommand command)
        {
            var comment = await _mediator.Send(command);

            if (comment is null) return;

            await Clients
                .Group(command.ChatRoomId!)
                .SendAsync("ReceiveChat", comment.Value);
        }

        #region overrides

        /// <summary>
        /// Method that handles when a client connects to our chat hub, specifically to a group (UserChatRoom).
        /// 1 - Fetch the user chat room id from context
        /// 2 - Add user to group.
        /// 3 - Return all the chats for this room.
        /// </summary>
        /// <returns>Valid Hub connection to the caller, and all the chats from this group.</returns>
        public override async Task OnConnectedAsync()
        {
            var hubHttpContext = Context.GetHttpContext();

            if (hubHttpContext is null) return;

            var ChatRoomId = hubHttpContext.Request.Query["chatRoomId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, ChatRoomId);

            var result = await _mediator.Send(new ListQuery { ChatRoomId = Guid.Parse(ChatRoomId) });

            await Clients.Caller.SendAsync("LoadChats", result.Value);
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
