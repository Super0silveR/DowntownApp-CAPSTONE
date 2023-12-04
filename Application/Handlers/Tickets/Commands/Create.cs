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
            public int? nbr;
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
                Guard.Against.Null(_context.EventTickets, nameof(_context.EventTickets));

                var scheduledEvent = await _context.ScheduledEvents.FindAsync(new object?[] { request.eventTicket.ScheduledEventId }, cancellationToken);

                if (scheduledEvent is null) return Result<Unit>.Failure("This Scheduled Event is invalid");

                if (request.nbr is null) { request.nbr = 1; }

                for (int i = 0; i < request.nbr; i++)
                {
                    var eventTicket = _mapper.Map<EventTicket>(request.eventTicket);

                    eventTicket.ScheduledEventId = scheduledEvent.Id;
                    eventTicket.ScheduledEvent = scheduledEvent;

                    _context.EventTickets.Add(eventTicket);
                }

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) 
                    return Result<Unit>.Failure("Failed to create a new Ticket.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
