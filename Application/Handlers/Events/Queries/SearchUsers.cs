using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

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

            public Handler(IDataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users
                    .Where(u => EF.Functions.Like(u.UserName, $"%{request.SearchTerm}%") ||
                                EF.Functions.Like(u.DisplayName, $"%{request.SearchTerm}%"))
                    .Select(u => new UserDto
                    {
                        UserName = u.UserName,
                        DisplayName = u.DisplayName,
                    })

                    .ToListAsync(cancellationToken);

                return Result<List<UserDto>>.Success(users);
            }
        }
    }
}
