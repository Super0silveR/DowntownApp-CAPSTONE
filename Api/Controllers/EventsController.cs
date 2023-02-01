using Api.Controllers.Base;
using Application.Queries;
using Ardalis.GuardClauses;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : BaseApiController
    {
        private readonly DataContext _context;

        public EventsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] //api/events
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            Guard.Against.Null(_context, nameof(_context));
            Guard.Against.Null(_context.Events, nameof(_context.Events));

            return await _context.Events.ToListAsync();
        }

        [HttpGet("{id}")] //api/events/{id}
        public async Task<ActionResult<Event?>> GetEvent(Guid id)
        {
            Guard.Against.Null(_context, nameof(_context));
            Guard.Against.Null(_context.Events, nameof(_context.Events));

            return await _context.Events.FindAsync(id);
        }
    }
}
