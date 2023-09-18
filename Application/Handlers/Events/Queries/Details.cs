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
    public class Details
    {
        public class Query : IRequest<Result<EventDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EventDto?>>
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

            public async Task<Result<EventDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Events, nameof(_context.Events));

                var @event = await _context.Events
                                           .ProjectTo<EventDto>(_mapper.ConfigurationProvider, new
                                           {
                                               currentUserName = _currentUserService.GetUserName()
                                           })
                                           .FirstOrDefaultAsync(edto => edto.Id == request.Id);

                return Result<EventDto?>.Success(@event);
            }
        }
    }
}
