using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Events.Queries
{
    public class AttendeDetails
    {
        public class Query : IRequest<Result<EventAttendeeDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EventAttendeeDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<EventAttendeeDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ScheduledEvents, nameof(_context.ScheduledEvents));

                var eventAttendeeDto = await _context.ScheduledEvents
                                           .ProjectTo<EventAttendeeDto>(_mapper.ConfigurationProvider)
                                           .FirstOrDefaultAsync(edto => edto.TicketId == request.Id);

                return Result<EventAttendeeDto?>.Success(eventAttendeeDto);
            }
        }
    }
}
