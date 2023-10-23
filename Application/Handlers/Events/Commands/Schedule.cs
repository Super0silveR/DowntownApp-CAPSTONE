using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using MediatR;

namespace Application.Handlers.Events.Commands
{
    public class Schedule
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public ScheduledEventDto ScheduledEvent { get; set; } = new ScheduledEventDto();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public Handler(IDataContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                if (!Guid.TryParse(_currentUserService.GetUserId(), out Guid userId)) return Result<Unit>.Failure("This user is invalid.");

                var user = await _context.Users.FindAsync(new object?[] { userId }, cancellationToken);

                if (user is null) throw new Exception("This user is invalid.");

                /// TODO : Implement
                /// TODO : Implement
                /// TODO : Implement

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
