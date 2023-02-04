using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Events
{
    public class Details
    {
        public class Query : IRequest<Event?>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Event?>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Event?> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                return await _context.Events.SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);
            }
        }
    }
}
