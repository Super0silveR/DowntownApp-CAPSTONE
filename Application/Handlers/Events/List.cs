using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Events
{
    public class List
    {
        public class Query : IRequest<List<Event>> { }

        public class Handler : IRequestHandler<Query, List<Event>>
        {
            private readonly DataContext _context;

            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<List<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                return await _context.Events.ToListAsync(cancellationToken);
            }
        }
    }
}
