using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Followers.Commands
{
    /// <summary>
    /// Application class that represents the command and handler for the `toggle following` process.
    /// </summary>
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public string? TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly ICurrentUserService _userService;

            public Handler(IDataContext context, ICurrentUserService userService)
            {
                _context = context;
                _userService = userService;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(request.TargetUsername, nameof(request.TargetUsername));
                Guard.Against.Null(_context.UserFollowings, nameof(_context.UserFollowings));

                /// Fetching the user initializing the `toggle follow`.
                User? observer = await _context.Users
                    .FirstOrDefaultAsync(user => user.UserName == _userService.GetUserName(), 
                                         cancellationToken);

                /// Fetching the user targeted by the `toggle follow`.
                User? target = await _context.Users
                    .FirstOrDefaultAsync(user => user.UserName == request.TargetUsername, 
                                         cancellationToken);

                Guard.Against.Null(observer, nameof(observer));

                if (target is null) return Result<Unit>.Failure("This user doesn't exist in our system.");

                /// Fetching the userfollowing object that represents the relation between observer and target.
                UserFollowing? following = await _context.UserFollowings
                    .FindAsync(new object?[] { observer.Id, target.Id },
                               cancellationToken);

                /// If the object is null (observer doesn't already follow the target)
                /// then create the new object.
                /// else remove the current one.
                if (following is null)
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };
                    _context.UserFollowings.Add(following);
                }
                else
                    _context.UserFollowings.Remove(following);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem when trying to toggle the following action.");
            }
        }
    }
}
