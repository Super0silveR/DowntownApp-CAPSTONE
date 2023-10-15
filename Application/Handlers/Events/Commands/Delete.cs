using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using MediatR;

namespace Application.Handlers.Events.Commands
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _dataContext;

            public Handler(IDataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Events, nameof(_dataContext.Events));

                var @event = await _dataContext.Events.FindAsync(new object?[] { request.Id },
                                                                 cancellationToken: cancellationToken);

                if (@event is null) return Result<Unit>.Failure("This event does not exist.");

                _dataContext.Events.Remove(@event);

                var result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to delete the Event.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
