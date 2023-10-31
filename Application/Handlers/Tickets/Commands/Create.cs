using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Handlers.Tickets.Commands
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public EventTicketCommandDto eventTicket { get; set; } = new EventTicketCommandDto();
        }

        /*public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;
            private readonly IEventService _eventService;

            public Handler(IDataContext context, IMapper mapper, IEventService eventService)
            {
                _context = context;
                _mapper = mapper;
                _eventService = eventService;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventTicket, nameof(_context.EventTicket));

                if (!Guid.TryParse(_eventService.GetEventId(), out Guid eventId)) return null;

                var @event = await _context.Events.FindAsync(new object?[] { eventId }, cancellationToken);

                if (@event is null) return null;

                var eventTicket = _mapper.Map<EventTicket>(request.eventTicket);
                eventTicket.ScheduledEventId = @event.Id;

                _context.EventTicket.Add(eventTicket);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) 
                    return Result<Unit>.Failure("Failed to create a new Ticket.");
                return Result<Unit>.Success(Unit.Value);
            }
        }*/
    }
}
