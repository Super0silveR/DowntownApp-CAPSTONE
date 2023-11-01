using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Handlers.Bars.Queries;
using Application.Handlers.Bars.Commands;
using Application.DTOs;
using Application.DTOs.Commands;

namespace Api.Controllers.Lookup
{
    [Authorize]
    [Route("api/[controller]")]
    public class BarsController : BaseApiController
    {
        public BarsController(MediatR.IMediator @object) { }

        #region Queries

        [HttpGet] //api/bars
        public async Task<IActionResult> GetBars()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/bars/{id}
        public async Task<IActionResult> GetBarDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        #endregion

        #region Commands

        [HttpPost] //api/bars
        public async Task<IActionResult> CreateBar(BarCommandDto barDto)
        {
            return HandleResult(await Mediator.Send(new CreateBar.Command { Bar = barDto }));
        }

        [HttpPut("{id}")] //api/bars/{id}
        public async Task<IActionResult> UpdateBar(Guid id, BarCommandDto barDto)
        {
            return HandleResult(await Mediator.Send(new EditBar.Command { Id = id, Bar = barDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBar(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteBar.Command { Id = id }));
        }

        #endregion
    }
}
