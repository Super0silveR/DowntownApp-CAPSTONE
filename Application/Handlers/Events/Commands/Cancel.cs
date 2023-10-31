using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using MediatR;

namespace Application.Handlers.Events.Commands
{
    public class Cancel
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
                Guard.Against.Null(_dataContext.ScheduledEvents, nameof(_dataContext.ScheduledEvents));

                var scheduledevent = await _dataContext.ScheduledEvents.FindAsync(new object?[] { request.Id },
                                                                 cancellationToken: cancellationToken);

                if (scheduledevent is null) return Result<Unit>.Failure("This event is not scheduled.");

                _dataContext.ScheduledEvents.Remove(scheduledevent);

                var result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                /// TODO : Remove all attending users, Refund tickets ...etc

                if (!result)
                    return Result<Unit>.Failure("Failed to delete the Event.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
