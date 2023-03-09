using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.ChallengeTypes.Queries
{
    /// <summary>
    /// Class that serves as the base for fetching a list of ChallengesTypes.
    /// </summary>
    public class List
    {
        /// <summary>
        /// Class that serves as the Query for indicating the mediator action.
        /// </summary>
        public class Query : IRequest<Result<List<ChallengeTypeDto>>> { }

        /// <summary>
        /// Class that serves as the Handler for the Query.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<List<ChallengeTypeDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ChallengeTypeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ChallengeTypes, nameof(_context.ChallengeTypes));

                var challengesDto = await _context.ChallengeTypes
                                                  .ProjectTo<ChallengeTypeDto>(_mapper.ConfigurationProvider)
                                                  .ToListAsync(cancellationToken);

                return Result<List<ChallengeTypeDto>>.Success(challengesDto);
            }
        }
    }
}
