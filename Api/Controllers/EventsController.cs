using Api.Controllers.Base;
using Application.Handlers.Events;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : BaseApiController
    {
        public EventsController() { }

        #region Queries

        [HttpGet] //api/events
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/events/{id}
        public async Task<ActionResult<Event?>> GetEvent(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        #endregion

        #region Commands

        [HttpPost] //api/events
        public async Task<IActionResult> CreateEvent(Event @event)
        {
            return Ok(await Mediator.Send(new Create.Command { Event = @event }));
        }

        [HttpPut("{id}")] //api/events/{id}
        public async Task<IActionResult> EditEvent(Guid id, Event @event)
        {
            @event.Id = id;

            return Ok(await Mediator.Send(new Edit.Command { Event = @event }));
        }

        [HttpDelete("{id}")] //api/events/{id}
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

        #endregion
    }
}
