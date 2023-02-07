using Ardalis.GuardClauses;
using MediatR;
using Persistence;

namespace Application.Handlers.Events
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

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

                var @event = await _dataContext.Events.FindAsync(request.Id);

                if (@event is null) return Unit.Value;

                _dataContext.Remove(@event);
                await _dataContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
