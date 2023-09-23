using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Handlers.EventTypes.Commands
{
    public class Create
    {
        /// <summary>
        /// Command class used to start the request for creating a new EventType.
        /// </summary>
        public class Command : IRequest<Result<Unit>>
        {
            public EventTypeCommandDto EventType { get; set; } = new EventTypeCommandDto();
        }

        /// <summary>
        /// Handler class used to handle the creation of the new EventType.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ICurrentUserService _userService;
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(ICurrentUserService userService, IDataContext context, IMapper mapper)
            {
                _userService = userService;
                _context = context;
                _mapper = mapper;
            }

            /// <summary>
            /// Creation logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Create.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventTypes, nameof(_context.EventTypes));
                Guard.Against.Null(request.EventType, nameof(request.EventType));

                /// Make sure the creatorId is always populated. (FK_CONSTRAINT)
                var eventType = _mapper.Map<EventType>(request.EventType);
                eventType.CreatorId = Guid.Parse(_userService.GetUserId()!);

                _context.EventTypes.Add(eventType);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) 
                    return Result<Unit>.Failure("Failed to create a new EventType.");
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
                RuleFor(c => c.EventType).SetValidator(new EventTypeCommandDtoValidator());
            }
        }
    }
}
