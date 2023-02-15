using Application.Core;
using Application.Validators;
using Ardalis.GuardClauses;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Handlers.Events
{
    public class Create
    {
        /// <summary>
        /// Command class used to start the request for creating a new Event.
        /// </summary>
        public class Command : IRequest<Result<Unit>>
        {
            public Event Event { get; set; } = new Event();
        }

        /// <summary>
        /// Handler class used to handle the creation of the new Event.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Events, nameof(_dataContext.Events));
                Guard.Against.Null(request.Event, nameof(request.Event));

                _dataContext.Events.Add(request.Event);
                
                bool result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create a new Event.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

        /// <summary>
        /// Validator class used for synchronous validation during the process pipeline.
        /// </summary>
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.Event).SetValidator(new EventValidator());
            }
        }
    }
}
