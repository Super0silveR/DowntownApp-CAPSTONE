using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Profiles.Queries
{
    public class ProfileDetails
    {
        public class Query : IRequest<Result<ProfileDto>?>
        {
            public string? UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProfileDto>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ProfileDto>?> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _context.Users
                    .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(u => u.UserName == request.UserName);

                if (profile is null) return null;

                return Result<ProfileDto>.Success(profile);
            }
        }
    }
}
