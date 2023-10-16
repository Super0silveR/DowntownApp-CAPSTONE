using Api.Controllers.Base;
using Application.Handlers.Tickets.Commands;
using Application.Handlers.Tickets.Queries;
using Application.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous] // TODO : Change this to Authorized when testing.
    public class TicketsController : BaseApiController
    {
        public TicketsController() { }


        //[HttpGet] //api/eventtickets
        //public async Task<IActionResult> GetTicket([FromQuery]TicketParams @params)
        //{
           // return HandleResult(await Mediator.Send("temp"));
        //}
     }
}
