using Application.Core;
using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Events
{
    public class List
    {
        public class Query : IRequest<Result<List<Event>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Event>>>
        {
            private readonly DataContext _context;

            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Event>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                return Result<List<Event>>.Success(await _context.Events.ToListAsync(cancellationToken));
            }
        }
    }
}
