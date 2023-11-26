using Api.Controllers.Base;
using Application.DTOs.Commands;
using Application.Handlers.Profiles.Commands;
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

        [HttpPost] /// api/Profiles
        public async Task<IActionResult> EditProfile(ProfileCommandDto @profile)
        {
            return HandleResult(await Mediator.Send(new GeneralEdit.Command { Profile = @profile }));
        }

        [HttpPut] /// api/Profiles
        public async Task<IActionResult> EditCreatorFields(CreatorFieldsDto creatorFields)
        {
            return HandleResult(await Mediator.Send(new CreatorEdit.Command { CreatorFields = creatorFields }));
        }
    }
}
