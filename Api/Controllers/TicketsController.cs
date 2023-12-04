using Api.Controllers.Base;
using Application.DTOs.Commands;
using Application.Handlers.Tickets.Commands;
using Application.Handlers.Tickets.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous] // TODO : Change this to Authorized when testing.
    public class TicketsController : BaseApiController
    {
        public TicketsController() { }

        #region Queries
        [HttpGet] //api/eventtickets
        public async Task<IActionResult> GetTickets()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("tickets/{id}")] //api/tickets/{id}
        public async Task<IActionResult> GetTicket(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        #endregion

        #region Commands
        [HttpPost] //api/tickets
        public async Task<IActionResult> CreateTickets(EventTicketCommandDto EventTicket, int? Nbr)
        {
            return HandleResult(await Mediator.Send(new Create.Command { eventTicket = EventTicket, nbr = Nbr }));
        }

        [HttpPut("{id}")] //api/tickets/{id}
        public async Task<IActionResult> EditTicket(Guid id, EventTicketCommandDto eventTicket)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, eventTicket = eventTicket}));
        }

        [HttpDelete] //api/tickets
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id }));
        }



        #endregion
    }
}
