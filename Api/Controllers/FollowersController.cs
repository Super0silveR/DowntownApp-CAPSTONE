using Api.Controllers.Base;
using Application.Handlers.Followers.Commands;
using Application.Handlers.Followers.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Public facing controller that handle the `Follower\Followee` logic.
    /// </summary>
    public class FollowersController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { 
                UserName = username, 
                Predicate = predicate
            }));
        }
    }
}
