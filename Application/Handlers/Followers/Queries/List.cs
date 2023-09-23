using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Followers.Queries
{
    public class List
    {
        public class Query : IRequest<Result<List<ProfileLightDto>>>
        {
            public string? Predicate { get; set; }
            public string? UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProfileLightDto>>>
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

            public async Task<Result<List<ProfileLightDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.UserFollowings, nameof(_context.UserFollowings));

                var profiles = new List<ProfileLightDto>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings
                            .Where(x => x.Target!.UserName == request.UserName)
                            .Select(u => u.Observer)
                            .ProjectTo<ProfileLightDto>(_mapper.ConfigurationProvider, new {
                                currentUserName = _currentUserService.GetUserName() 
                            })
                            .ToListAsync(cancellationToken: cancellationToken);
                        break;
                    case "following":
                        profiles = await _context.UserFollowings
                            .Where(x => x.Observer!.UserName == request.UserName)
                            .Select(u => u.Target)
                            .ProjectTo<ProfileLightDto>(_mapper.ConfigurationProvider, new {
                                currentUserName = _currentUserService.GetUserName()
                            })
                            .ToListAsync(cancellationToken: cancellationToken);
                        break;
                }

                return Result<List<ProfileLightDto>>.Success(profiles);
            }
        }
    }
}
