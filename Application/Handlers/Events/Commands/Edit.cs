using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using FluentValidation;
using MediatR;
using System.Diagnostics.CodeAnalysis;

namespace Application.Handlers.Events.Commands
{
    public class Edit
    {
        /// <summary>
        /// Command class used to start the request for editing an Event.
        /// </summary>
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
            public EventCommandDto Event { get; set; } = new EventCommandDto();
        }

        /// <summary>
        /// Handler class used to handle the editing of an Event.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(IDataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            /// <summary>
            /// Editing logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Edit.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Events, nameof(_dataContext.Events));

                var @event = await _dataContext.Events.FindAsync(new object?[] { request.Id },
                                                                 cancellationToken: cancellationToken);

                if (@event is null) return Result<Unit>.Failure("This event does not exist.");

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
        [ExcludeFromCodeCoverage]
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.Event).SetValidator(new EventCommandDtoValidator());
            }
        }
    }
}
