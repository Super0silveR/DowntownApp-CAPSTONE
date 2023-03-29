using Application.Common.Interfaces;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Photos.Commands
{
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public string? Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMediaService _mediaService;
            private readonly ICurrentUserService _currentUserService;

            public Handler(IDataContext context, IMediaService mediaService, ICurrentUserService currentUserService)
            {
                _context = context;
                _mediaService = mediaService;
                _currentUserService = currentUserService;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _currentUserService.GetUserName());

                if (user is null) return null;

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo is null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo.");

                var result = await _mediaService.DeleteMedia(photo.Id!);

                if (result is null) return Result<Unit>.Failure("Failed to delete the photo from Cloudinary.");
                
                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Failed to delete the photo from Api.");
            }
        }
    }
}
