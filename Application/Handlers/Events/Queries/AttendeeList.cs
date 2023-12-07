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
    public class AttendeeList
    {
        public class Query : IRequest<Result<List<EventAttendeeDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<EventAttendeeDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<EventAttendeeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                var eventAttendeeDtos = await _context.ScheduledEventAttendees
                                              .ProjectTo<EventAttendeeDto>(_mapper.ConfigurationProvider)
                                              .ToListAsync(cancellationToken);

                return Result<List<EventAttendeeDto>>.Success(eventAttendeeDtos);
            }
        }
    }
}
