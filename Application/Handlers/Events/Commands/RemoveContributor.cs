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
using System.Threading;
using System.Threading.Tasks;
namespace Application.Handlers.Events.Commands
{
    public class RemoveContributor
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public EventContributorCommandDto Contributor { get; set; } = new EventContributorCommandDto();
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
             RuleFor(x => x.Contributor).SetValidator(new EventContributorCommandDtoValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                var @event = await _context.Events.FindAsync(new object[] { request.Id }, cancellationToken);

                if (@event is null) return Result<Unit>.Failure("Event not found");

                var currentUserId = Guid.NewGuid(); // replace with your current user id

                var contributor = @event.Contributors.FirstOrDefault(c => c.UserId == request.Contributor.UserId);

                if (contributor is null) return Result<Unit>.Failure("User is not a contributor");

                if (contributor.Status == ContributorStatus.Creator)
                {
                    return Result<Unit>.Failure("The creator of the event cannot be removed");
                }

                if (@event.CreatorId != currentUserId && contributor.UserId != currentUserId)
                {
                    return Result<Unit>.Failure("Only the creator of the event or the contributor themselves can remove the contributor");
                }

                _context.EventContributors.Remove(contributor);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to remove contributor from event");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
