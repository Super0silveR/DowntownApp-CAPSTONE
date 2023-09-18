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
    public class List
    {
        public class Query : IRequest<Result<List<EventDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<EventDto>>>
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

            public async Task<Result<List<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                var eventDtos = await _context.Events
                                              .OrderByDescending(e => e.Created)
                                              .ProjectTo<EventDto>(_mapper.ConfigurationProvider, new
                                              {
                                                  currentUserName = _currentUserService.GetUserName()
                                              })
                                              .ToListAsync(cancellationToken);

                return Result<List<EventDto>>.Success(eventDtos);
            }
        }
    }
}
