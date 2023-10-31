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
    public class Scheduled
    {
        public class Query : IRequest<Result<List<ScheduledEventDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ScheduledEventDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ScheduledEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                var scheduledEventDtos = await _context.ScheduledEvents
                                              .ProjectTo<ScheduledEventDto>(_mapper.ConfigurationProvider)
                                              .ToListAsync(cancellationToken);

                return Result<List<ScheduledEventDto>>.Success(scheduledEventDtos);
            }
        }
    }
}
