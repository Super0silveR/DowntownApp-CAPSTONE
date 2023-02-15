using Application.Common.Interfaces;
using Application.Core;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Handlers.Events.Commands
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public Event Event { get; set; } = new Event();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(IDataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Events, nameof(_dataContext.Events));
                Guard.Against.Null(request.Event, nameof(request.Event));

                var @event = await _dataContext.Events.FindAsync(new object?[] { request.Event.Id },
                                                                 cancellationToken: cancellationToken);

                if (@event is null) return null;

                _mapper.Map(request.Event, @event);

                bool result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update an Event.");
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
