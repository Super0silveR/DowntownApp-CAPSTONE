using Api.Controllers.Base;
using Application.Handlers.Profiles.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")] /// api/Profiles/{username}
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new ProfileDetails.Query { UserName = username }));
        }
    }
}
