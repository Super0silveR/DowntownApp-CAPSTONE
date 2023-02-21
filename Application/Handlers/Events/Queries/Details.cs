using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;

namespace Application.Handlers.Events.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<Event?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Event?>>
        {
            private readonly IDataContext _context;

            public Handler(IDataContext context)
            {
                _context = context;
            }

            public async Task<Result<Event?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                Event? @event = await _context.Events.FindAsync(new object?[] { request.Id },
                                                       cancellationToken: cancellationToken);

                return Result<Event?>.Success(@event);
            }
        }
    }
}
