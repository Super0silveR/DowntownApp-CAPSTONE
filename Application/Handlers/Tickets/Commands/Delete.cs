using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using MediatR;

namespace Application.Handlers.Tickets.Commands
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
                Guard.Against.Null(_dataContext.EventTickets, nameof(_dataContext.EventTickets));

                var eventTicket = await _dataContext.EventTickets.FindAsync(new object?[] { request.Id },
                                                                 cancellationToken: cancellationToken);

                if (eventTicket is null) return Result<Unit>.Failure("This ticket does not exist.");

                _dataContext.EventTickets.Remove(eventTicket);

                var result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to delete the Ticket.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
