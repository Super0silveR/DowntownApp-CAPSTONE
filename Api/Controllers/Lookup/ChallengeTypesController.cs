/*using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Handlers.ChallengeTypes.Queries;
using Application.Handlers.ChallengeTypes.Commands;
using Application.DTOs;
using Application.DTOs.Commands;

namespace Api.Controllers.Lookup
{
    [Authorize(Policies.CREATOR)]
    [Route("api/[controller]")]
    public class ChallengeTypesController : BaseApiController
    {
        public ChallengeTypesController() { }

        #region Queries

        [HttpGet] //api/challengetypes
        public async Task<IActionResult> GetChallengeTypes()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/challengetypes/{id}
        public async Task<IActionResult> GetChallengeTypesDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        #endregion

        #region Commands

        [HttpPost] //api/challengetypes
        public async Task<IActionResult> CreateChallengeType(ChallengeTypesCommandDto challengeDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ChallengeType = challengeDto }));
        }

        [HttpPut("{id}")] //api/challengetypes/{id}
        public async Task<IActionResult> UpdateChallengeType(Guid id, ChallengeTypeCommandDto challengeDto)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, ChallengeType = challengeDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChallengeType(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        #endregion
    }
}
*/