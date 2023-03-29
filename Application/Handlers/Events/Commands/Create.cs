using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.Events;
using FluentValidation;
using MediatR;

namespace Application.Handlers.Events.Commands
{
    public class Create
    {
        /// <summary>
        /// Command class used to start the request for creating a new Event.
        /// </summary>
        public class Command : IRequest<Result<Unit>?>
        {
            public EventCommandDto Event { get; set; } = new EventCommandDto();
        }

        /// <summary>
        /// Validator class used for synchronous validation during the process pipeline.
        /// </summary>
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.Event).SetValidator(new EventCommandDtoValidator());
            }
        }

        /// <summary>
        /// Handler class used to handle the creation of the new Event.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _userService;

            public Handler(IDataContext context, IMapper mapper, ICurrentUserService userService)
            {
                _context = context;
                _mapper = mapper;
                _userService = userService;
            }

            /// <summary>
            /// Creation logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Create.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                if (!Guid.TryParse(_userService.GetUserId(), out Guid userId)) return null;

                var user = await _context.Users.FindAsync(new object?[] { userId }, cancellationToken);

                if (user is null) throw new Exception("This user is invalid.");

                var @event = _mapper.Map<Event>(request.Event);
                @event.CreatorId = user.Id;

                var eventContributor = new EventContributor
                {
                    Event = @event,
                    User = user,
                    IsActive = true,
                    IsAdmin = true,
                    Status = ContributorStatus.Creator
                };

                /// Adding the default contributor, which is the creator.
                @event.Contributors.Add(eventContributor);

                _context.Events.Add(@event);

                /// Add a domain event to the entity so our INotification handler can perform some work.
                @event.AddDomainEvent(new CreatedEvent(@event));

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create a new Event.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
