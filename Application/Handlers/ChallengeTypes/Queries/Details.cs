using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.ChallengeTypes.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<ChallengeTypeDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ChallengeTypeDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ChallengeTypeDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ChallengeTypes, nameof(_context.ChallengeTypes));

                var challengeDto = await _context.ChallengeTypes
                                                .ProjectTo<ChallengeTypeDto>(_mapper.ConfigurationProvider)
                                                .FirstOrDefaultAsync(ec => ec.Id == request.Id, cancellationToken);

                return Result<ChallengeTypeDto?>.Success(challengeDto);
            }
        }
    }
}
