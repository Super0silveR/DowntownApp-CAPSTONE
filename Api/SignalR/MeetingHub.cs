using Api.SignalR.Base;
using Application.Handlers.Meetings.Queries;
using Ardalis.GuardClauses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Api.SignalR
{
    /// <summary>
    /// Class that represents a SignalR Hub for our Meeting feature.
    /// 
    /// </summary>
    [Authorize]
    public class MeetingHub : BaseHub
    {
        public MeetingHub(IMediator mediator) : base(mediator) { }

        /// <summary>
        /// Logic for when we need to bind the user connection of our Hub, to his respective groups. (UserMeetingZooms)
        /// 1. Fetch all the UserMeetingZooms for this user. These will be used as Hub groups.
        /// 2. Foreach UserMeetingZooms, bind the User connection to each one of them.
        /// </summary>
        /// <returns></returns>
        public async Task AddUserToGroupsAsync()
        {
            Guard.Against.Null(Context.UserIdentifier, nameof(Context.UserIdentifier));

            var userId = Guid.Parse(Context.UserIdentifier);
            var userName = Context.User.FindFirstValue(ClaimTypes.Name);
            var connectionId = Context.ConnectionId;

            var groups = await _mediator.Send(new ListUserMeetingZooms.Query { UserId = userId });

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
        /// When a client connects to our meeting hub.
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
        /// When a client disconnects to our meeting hub.
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