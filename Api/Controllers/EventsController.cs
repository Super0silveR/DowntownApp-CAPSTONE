using Api.Controllers.Base;
using Application.DTOs;
using Application.Handlers.Events.Commands;
using Application.Handlers.Events.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class EventsController : BaseApiController
    {
        public EventsController() { }

        #region Queries
        [Authorize("read:events")]
        [HttpGet] //api/events
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize("read:events")]
        [HttpGet("{id}")] //api/events/{id}
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        #endregion

        #region Commands

        [HttpPost] //api/events
        public async Task<IActionResult> CreateEvent(EventDto @event)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = @event }));
        }

        [HttpPut("{id}")] //api/events/{id}
        public async Task<IActionResult> EditEvent(Guid id, EventDto @event)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, Event = @event }));
        }

        [HttpDelete("{id}")] //api/events/{id}
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        #endregion
    }
}
