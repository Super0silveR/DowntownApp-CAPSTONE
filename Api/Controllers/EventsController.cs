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
    }
}
