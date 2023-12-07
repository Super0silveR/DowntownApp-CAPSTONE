using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.Events.Commands
{
    public class AttendEvent
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public EventAtendeeCommandDto EventAtendee { get; set; } = new EventAtendeeCommandDto();
        }

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

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ScheduledEventAttendees, nameof(_context.ScheduledEventAttendees));

                if (!Guid.TryParse(_userService.GetUserId(), out Guid userId)) return Result<Unit>.Failure("This user is invalid.");

                var user = await _context.Users.FindAsync(new object?[] { userId }, cancellationToken);
                var scheduledEvent = await _context.ScheduledEvents.FindAsync(new object?[] { request.EventAtendee.ScheduledEventId }, cancellationToken);
                var eventTicket = await _context.EventTickets.FindAsync(new object?[] { request.EventAtendee.TicketId }, cancellationToken);

                if (user is null) throw new Exception("This user is invalid.");
                if (scheduledEvent == null) throw new Exception("This event is not scheduled.");
                if (eventTicket == null) throw new Exception("This ticket is invalid.");

                var eventAttendee = _mapper.Map<EventAttendee>(request.EventAtendee);

                eventAttendee.AttendeeId = user.Id;
                eventAttendee.Event = scheduledEvent;
                eventAttendee.Attendee = user;
                eventAttendee.Ticket = eventTicket;


                _context.ScheduledEvents.Add(scheduledEvent);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to schedule a new event.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
