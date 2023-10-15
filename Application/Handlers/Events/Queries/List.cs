using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Application.Params;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Events.Queries
{
    /// <summary>
    /// Handler class for returning all the listed events.
    /// </summary>
    public class List
    {
        /// <summary>
        /// Query class used as our "request object" for MediatR, with, in this case, parameters.
        /// </summary>
        public class Query : IRequest<Result<PagedList<EventDto>>>
        {
            public EventParams Params { get; set; } = new EventParams();
        }

        /// <summary>
        /// Handler class used when the request "query" is passed to MediatR.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<PagedList<EventDto>>>
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

            public async Task<Result<PagedList<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));
                Guard.Against.NullOrEmpty(_currentUserService.GetUserId(), nameof(_currentUserService));  

                var eventDtoQuery = _context.Events
                    .Where(e => e.Date >= request.Params.StartDate)
                    .OrderByDescending(e => e.Date)
                    .ProjectTo<EventDto>(_mapper.ConfigurationProvider, new
                    {
                        currentUserName = _currentUserService.GetUserName()
                    })
                    .AsQueryable();

                /// Updating the query to accommodate filtering, specifically for the currently logged in user.
                if (request.Params.IsGoing && !request.Params.IsHosting)
                {
                    eventDtoQuery = eventDtoQuery.Where(edto => edto.Attendees!.Any(a => a.UserName == _currentUserService.GetUserName()));
                }

                if (request.Params.IsHosting && !request.Params.IsGoing)
                {
                    eventDtoQuery = eventDtoQuery.Where(edto => edto.CreatorId == Guid.Parse(_currentUserService.GetUserId()!));
                }

                return Result<PagedList<EventDto>>.Success(
                    await PagedList<EventDto>.CreateAsync(eventDtoQuery, 
                        request.Params.PageNumber, 
                        request.Params.PageSize)
                );
            }
        }
    }
}
