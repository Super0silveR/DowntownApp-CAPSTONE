using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Ardalis.GuardClauses;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.EventTypes.Queries
{
    /// <summary>
    /// Class that serves as the base for fetching a list of EventTypes.
    /// </summary>
    public class List
    {
        /// <summary>
        /// Class that serves as the Query for indicating the mediator action.
        /// </summary>
        public class Query : IRequest<Result<List<EventTypeDto>>> { }

        /// <summary>
        /// Class that serves as the Handler for the Query.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<List<EventTypeDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<EventTypeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventTypes, nameof(_context.EventTypes));

                var types = await _context.EventTypes.ToListAsync(cancellationToken);
                var typesDto = _mapper.Map<List<EventTypeDto>>(types);

                return Result<List<EventTypeDto>>.Success(typesDto);
            }
        }
    }
}
