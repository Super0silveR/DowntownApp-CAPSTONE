using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.Events
{
    public class Create
    {
        /// <summary>
        /// Command class used to start the request for creating a new Event.
        /// </summary>
        public class Command : IRequest
        {
            public Event Event { get; set; } = new Event();
        }

        /// <summary>
        /// Handler class used to handle the creation of the new Event.
        /// </summary>
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Events, nameof(_dataContext.Events));
                Guard.Against.Null(request.Event, nameof(request.Event));

                _dataContext.Events.Add(request.Event);
                await _dataContext.SaveChangesAsync(cancellationToken);

                /// Equivalent to nothing since Commands don't return anything.
                return Unit.Value;
            }
        }
    }
}
