using Application.Common.Interfaces;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.Photos.Commands
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public string? Id { get; set; }
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
                var user = await _context.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userService.GetUserName());

                if (user is null) return null;

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo is null) return null;

                var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);

                if (currentMain is not null) currentMain.IsMain = false;

                photo.IsMain = true;

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Failed to set a photo to `MAIN`.");
            }
        }
    }
}
