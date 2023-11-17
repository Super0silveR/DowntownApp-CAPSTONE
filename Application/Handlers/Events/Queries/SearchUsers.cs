using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers.Events.Queries
{
    public class SearchUsers
    {
        public class Query : IRequest<Result<List<UserDto>>>
        {
            public string SearchTerm { get; set; }

            public Query(string searchTerm)
            {
                SearchTerm = searchTerm;
            }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users
                    .Where(u => EF.Functions.Like(u.UserName, $"%{request.SearchTerm}%") ||
                                EF.Functions.Like(u.DisplayName, $"%{request.SearchTerm}%"))
                    .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<UserDto>>.Success(users);
            }
        }
    }
}
