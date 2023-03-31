using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Application.Handlers.Events.Commands;
using Application.Handlers.Events.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Commands;

namespace Api.Controllers
{
    [AllowAnonymous] // TODO: Temporarily for testing the frontend.
    public class EventsController : BaseApiController
    {
        public EventsController() { }

        #region Queries

        [Authorize(Policies.READ_EVENTS)]
        [HttpGet] //api/events
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize(Policies.READ_EVENTS)]
        [HttpGet("{id}")] //api/events/{id}
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
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

        [Authorize(Policies.WRITE_EVENTS)]
        [HttpPost("{id}/schedule")] //api/events/{id}/schedule
        public async Task<IActionResult> ScheduleEvent(Guid id, EventCommandDto @event)
        {
        return HandleResult(await Mediator.Send(new Schedule.Command { Id = id, Event = @event }));
        }

        [HttpPut("{id}/contributors/{contributorId}")]
        public async Task<IActionResult> AddContributor(Guid id, EventContributorCommandDto @contributor)
        {
            return HandleResult(await Mediator.Send(new AddContributor.Command { Id = id, Contributor = @contributor }));
        }

        [HttpDelete("{id}/contributors/{contributorId}")]
        public async Task<IActionResult> RemoveContributor(Guid id, EventContributorCommandDto @contributor)
        {
            return HandleResult(await Mediator.Send(new RemoveContributor.Command { Id = id, Contributor = @contributor }));
        }

        [HttpPost("{id}/review")]//api/events/{id}/review
        public async Task<IActionResult> ReviewEvent(Guid id, EventReviewCommandDto @review)
        {
            return HandleResult(await Mediator.Send(new Review.Command { Id = id, Review = @review }));
        }

        [HttpPost("{id}/rate")]//api/events/{id}/rate
        public async Task<IActionResult> RateEvent(Guid id, EventRateCommandDto @rate)
        {
            return HandleResult(await Mediator.Send(new Rate.Command { Id = id, Rate = @rate }));
        }

        #endregion
    }
}
