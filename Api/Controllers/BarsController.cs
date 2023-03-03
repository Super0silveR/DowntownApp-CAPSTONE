using Api.Controllers.Base;
using Application.DTOs.Commands;
using Application.Handlers.Bars.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous]
    public class BarsController : BaseApiController
    {
        #region Commands

        [HttpPost] //api/bars
        public async Task<IActionResult> CreateEvent(BarCommandDto bar)
        {
            return HandleResult(await Mediator.Send(new CreateBar.Command { Bar = bar }));
        }

        [HttpPut("{id}")] //api/bars/{id}
        public async Task<IActionResult> EditEvent(Guid id, BarCommandDto bar)
        {
            return HandleResult(await Mediator.Send(new EditBar.Command { Id = id, Bar = bar }));
        }

        //[HttpDelete("{id}")] //api/bars/{id}
        //public async Task<IActionResult> DeleteEvent(Guid id)
        //{
        //    return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        //}

        #endregion
    }
}
