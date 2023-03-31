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
    public class AddContributor
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

                if (!Guid.TryParse(_userService.GetUserId(), out Guid currentUserId)) return null;

                var user = await _context.Users.FindAsync(new object[] { currentUserId }, cancellationToken);

                if (user is null) throw new Exception("This user is invalid.");

                var @event = await _context.Events.FindAsync(new object[] { request.Id }, cancellationToken);

                if (@event is null) return Result<Unit>.Failure("Event not found");

                if (@event.CreatorId != currentUserId) return Result<Unit>.Failure("Only event creator can add contributors");

                var contributor = await _context.Users.FindAsync(new object[] { request.Contributor }, cancellationToken);

                if (contributor is null) return Result<Unit>.Failure("User not found");

                var existingContributor = await _context.EventContributors.FindAsync(new object[] { request.Id, contributor.Id }, cancellationToken);

                if (existingContributor != null) return Result<Unit>.Failure("User is already a contributor");

                var newContributor = new EventContributor
                {
                    Id = request.Id,
                    UserId = contributor.Id,
                    IsActive = true,
                    IsAdmin = request.Contributor.IsAdmin,
                    Status = ContributorStatus.Creator
                };

                @event.Contributors.Add(newContributor);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to add contributor to event");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
