using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Handlers.EventTypes.Queries;
using Application.Handlers.EventTypes.Commands;
using Application.DTOs;

namespace Api.Controllers.Lookup
{
    [Authorize(Policies.CREATOR)]
    [Route("api/[controller]")]
    public class EventTypesController : BaseApiController
    {
	@@ -24,20 +23,31 @@ public async Task<IActionResult> GetEventTypes()
        }

        [HttpGet("{id}")] //api/eventtypes/{id}
        public async Task<IActionResult> GetEventTypeDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        #endregion

        #region Commands

        [HttpPost] //api/eventtypes
        public async Task<IActionResult> CreateEventType(EventTypeDto typeDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { EventType = typeDto }));
        }

        [HttpPut("{id}")] //api/eventtypes/{id}
        public async Task<IActionResult> UpdateEventType(Guid id, EventTypeDto typeDto)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, EventType = typeDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventType(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        #endregion
    }
}