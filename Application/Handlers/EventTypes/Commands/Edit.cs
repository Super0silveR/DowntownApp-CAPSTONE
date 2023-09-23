using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace Application.Handlers.EventTypes.Commands
{
    public class Edit
    {
        /// <summary>
        /// Command class used to start the request for editing an EventType.
        /// </summary>
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
            public EventTypeCommandDto EventType { get; set; } = new EventTypeCommandDto();
        }

        /// <summary>
        /// Handler class used to handle the editing of the EventType.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
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
                Guard.Against.Null(_context.EventTypes, nameof(_context.EventTypes));

                var eventType = await _context.EventTypes.FindAsync(new object?[] { request.Id }, cancellationToken);

                if (eventType is null) return null;

                _mapper.Map(request.EventType, eventType);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update an EventType.");
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
                RuleFor(x => x.EventType).SetValidator(new EventTypeCommandDtoValidator());
            }
        }
    }
}
