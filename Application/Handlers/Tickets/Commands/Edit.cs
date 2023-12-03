using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Ardalis.GuardClauses;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace Application.Handlers.Tickets.Commands
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
            public EventTicketCommandDto eventTicket { get; set; } = new EventTicketCommandDto();
        }
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(IDataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.EventTickets, nameof(_dataContext.EventTickets));

                var eventTicket = await _dataContext.EventTickets.FindAsync(new object?[] { request.Id }, cancellationToken);

                if (eventTicket is null) return Result<Unit>.Failure("This Ticket does not exist.");

                _mapper.Map(request.eventTicket, eventTicket);

                bool result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update a Ticket.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
