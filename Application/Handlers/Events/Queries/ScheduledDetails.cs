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
    public class ScheduledDetails
    {
        public class Query : IRequest<Result<ScheduledEventDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ScheduledEventDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ScheduledEventDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ScheduledEvents, nameof(_context.ScheduledEvents));

                var scheduledEvent = await _context.ScheduledEvents
                                           .ProjectTo<ScheduledEventDto>(_mapper.ConfigurationProvider)
                                           .FirstOrDefaultAsync(edto => edto.Id == request.Id);

                return Result<ScheduledEventDto?>.Success(scheduledEvent);
            }
        }
    }
}
