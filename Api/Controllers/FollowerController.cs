using Api.Controllers.Base;
using Application.Handlers.Followers.Commands;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Public facing controller that handle the `Follower\Followee` logic.
    /// </summary>
    public class FollowerController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
        }
    }
}
