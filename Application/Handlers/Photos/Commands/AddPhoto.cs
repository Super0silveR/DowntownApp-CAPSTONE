using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Photos.Commands
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<UserPhoto>?>
        {
            public IFormFile? File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<UserPhoto>?>
        {
            private readonly IDataContext _context;
            private readonly IMediaService _mediaService;
            private readonly ICurrentUserService _currentUserService;

            public Handler(IDataContext context,
                           IMediaService mediaService,
                           ICurrentUserService currentUserService)
            {
                _context = context;
                _mediaService = mediaService;
                _currentUserService = currentUserService;
            }

            public async Task<Result<UserPhoto>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(request.File, nameof(request.File));

                var user = await _context.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _currentUserService.GetUserName(), cancellationToken);

                if (user is null) return null;

                var uploadResult = await _mediaService.AddMedia(request.File);

                if (uploadResult is null) return null;

                var photo = new UserPhoto
                {
                    Url = uploadResult.Url,
                    Id = uploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (result) return Result<UserPhoto>.Success(photo);
                return Result<UserPhoto>.Failure("Failed to upload a new photo.");
            }
        }
    }
}
