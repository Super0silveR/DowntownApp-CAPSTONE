﻿using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Application.Handlers.Events.Commands;
using Application.Handlers.Events.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Commands;
using Application.Params;

namespace Api.Controllers
{
    [AllowAnonymous] // TODO: Temporarily for testing the frontend.
    public class EventsController : BaseApiController
    {
        public EventsController() { }

        #region Queries

        [Authorize(Policies.READ_EVENTS)]
        [HttpGet] //api/events
        public async Task<IActionResult> GetEvents([FromQuery]EventParams @params)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = @params }));
        }

        [Authorize(Policies.READ_EVENTS)]
        [HttpGet("{id}")] //api/events/{id}
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize]
        [HttpGet("Scheduled")]
        public async Task<IActionResult> GetScheduledEvents()
        {
            return HandleResult(await Mediator.Send(new Scheduled.Query()));
        }

        [Authorize]
        [HttpGet("Scheduled/{id}")]
        public async Task<IActionResult> GetScheduledEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new ScheduledDetails.Query { Id = id }));
        }

        #endregion

        #region Commands

        [Authorize(Policies.WRITE_EVENTS)]
        [HttpPost] //api/events
        public async Task<IActionResult> CreateEvent(EventCommandDto @event)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = @event }));
        }

        [Authorize(Policies.WRITE_EVENTS)]
        [HttpPut("{id}")] //api/events/{id}
        public async Task<IActionResult> EditEvent(Guid id, EventCommandDto @event)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, Event = @event }));
        }

        [Authorize(Policies.WRITE_EVENTS)]
        [HttpDelete("{id}")] //api/events/{id}
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [Authorize]
        [HttpPost("Scheduling")]
        public async Task<IActionResult> CreateScheduledEvents(ScheduledEventCommandDto scheduledEvent)
        {
            return HandleResult(await Mediator.Send(new Schedule.Command { ScheduledEvent = scheduledEvent }));
        }

        [Authorize]
        [HttpDelete("scheduled/{id}")]
        public async Task<IActionResult> CancelEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Cancel.Command { Id = id }));   
        }
        
        [HttpGet("SearchUsers")] // api/events/SearchUsers?query=someusername
        public async Task<IActionResult> SearchUsers(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return BadRequest("Search term must not be empty.");
            }

            return HandleResult(await Mediator.Send(new SearchUsers.Query(searchTerm)));
        }

        [Authorize]
        [HttpPost("Attend")]
        public async Task<IActionResult> AttendEvent(EventAtendeeCommandDto eventAttendee)
        {
            return HandleResult(await Mediator.Send(new AttendEvent.Command { EventAtendee = eventAttendee }));
        }

        [Authorize]
        [HttpGet("Attend")]
        public async Task<IActionResult> GetAtendees()
        {
            return HandleResult(await Mediator.Send(new AttendeeList.Query()));
        }

        [Authorize]
        [HttpGet("Attend/{id}")]
        public async Task<IActionResult> GetAtendee(Guid id)
        {
            return HandleResult(await Mediator.Send(new AttendeDetails.Query { Id = id }));
        }





        #endregion
    }
}
