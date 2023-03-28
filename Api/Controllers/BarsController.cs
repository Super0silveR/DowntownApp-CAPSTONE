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
        public async Task<IActionResult> CreateBar(BarCommandDto bar)
        {
            return HandleResult(await Mediator.Send(new CreateBar.Command { Bar = bar }));
        }

        [HttpPut("{id}")] //api/bars/{id}
        public async Task<IActionResult> EditBar(Guid id, BarCommandDto bar)
        {
            return HandleResult(await Mediator.Send(new EditBar.Command { Id = id, Bar = bar }));
        }

        [HttpDelete("{id}")] // api/bars/{id}
        public async Task<IActionResult> DeleteBar(Guid id)
        {
        return HandleResult(await Mediator.Send(new DeleteBar.Command { Id = id }));
        }

        #endregion

        #region Queries

        [HttpGet] //api/bars
        public async Task<IActionResult> GetBars()
        {
            return HandleResult(await Mediator.Send(new GetBars.Query()));
        }

        [HttpGet("{id}")] //api/bars/{id}
        public async Task<IActionResult> GetBarById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetBarById.Query { Id = id }));
        }

        [HttpGet("list")] //api/bars/list
        public async Task<IActionResult> GetBarList()
        {
            return HandleResult(await Mediator.Send(new GetBarList.Query()));
        }



        /*
        public async Task<IActionResult> AttendEvent(Guid barId, Guid eventId, Guid attendeeId)
{
    var bar = await _context.Bars.Include(b => b.Events)
                                  .ThenInclude(be => be.Attendees)
                                  .FirstOrDefaultAsync(b => b.Id == barId);

    if (bar == null)
    {
        return NotFound("Bar not found");
    }

    var barEvent = bar.Events.FirstOrDefault(be => be.EventId == eventId);

    if (barEvent == null)
    {
        return NotFound("Event not found at bar");
    }

    var attendee = await _context.Attendees.FindAsync(attendeeId);

    if (attendee == null)
    {
        return NotFound("Attendee not found");
    }

    var existingAttendance = barEvent.Attendees.FirstOrDefault(a => a.AttendeeId == attendeeId);

    if (existingAttendance != null)
    {
        return BadRequest("Attendee has already registered for the event");
    }

    barEvent.Attendees.Add(new BarEventAttendee { AttendeeId = attendeeId });
    await _context.SaveChangesAsync();

    return Ok();
}

        */

        #endregion
    }
}
