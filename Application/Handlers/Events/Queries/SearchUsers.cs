using Application.Common.Interfaces;
using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Events.Queries
{
    public class SearchUsers
    {
        public class Query : IRequest<Result<List<User>>>
        {
            public string SearchTerm { get; set; }

            public Query(string searchTerm)
            {
                SearchTerm = searchTerm;
            }
        }

        public class Handler : IRequestHandler<Query, Result<List<User>>>
        {
            private readonly IDataContext _context;

            public Handler(IDataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<User>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users
                    .Where(u => EF.Functions.Like(u.UserName, $"%{request.SearchTerm}%") ||
                                EF.Functions.Like(u.DisplayName ?? "", $"%{request.SearchTerm}%"))
                    .ToListAsync(cancellationToken);

                return Result<List<User>>.Success(users);
            }
        }
    }
}
