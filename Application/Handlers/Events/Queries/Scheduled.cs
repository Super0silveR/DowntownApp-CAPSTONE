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
            private readonly ICurrentUserService _currentUserService;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, ICurrentUserService currentUserService, IMapper mapper)
            {
                _context = context;
                _currentUserService = currentUserService;
                _mapper = mapper;
            }

            public async Task<Result<List<ScheduledEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                var eventDtos = await _context.ScheduledEvents
                                              .OrderByDescending(e => e.Scheduled)
                                              .Include(e => e.Attendees)
                                              .ProjectTo<ScheduledEventDto>(_mapper.ConfigurationProvider, new
                                              {
                                                  currentUserName = _currentUserService.GetUserName()
                                              })
                                              .ToListAsync(cancellationToken);

                return Result<List<ScheduledEventDto>>.Success(eventDtos);
            }
        }
    }
}
