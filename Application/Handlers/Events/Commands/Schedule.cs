using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Handlers.Events.Commands
{
    public class Schedule
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public ScheduledEventCommandDto ScheduledEvent { get; set; } = new ScheduledEventCommandDto();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ScheduledEvents, nameof(_context.ScheduledEvents));

                var bar = await _context.Bars.FindAsync(new object?[] { request.ScheduledEvent.BarId }, cancellationToken);
                var @event = await _context.Events.FindAsync(new object?[] {request.ScheduledEvent.EventId}, cancellationToken);

                if (bar == null) throw new Exception("This bar is invalid.");
                if (@event == null) throw new Exception("This event is invalid.");

                var scheduledEvent = _mapper.Map<ScheduledEvent>(request.ScheduledEvent);

                scheduledEvent.Bar = bar;
                scheduledEvent.Event = @event;

                _context.ScheduledEvents.Add(scheduledEvent);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to schedule a new event.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
