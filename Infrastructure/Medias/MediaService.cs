using Application.Common.Interfaces;
using Application.Medias.Cloudinary;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Medias.Cloudinary;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Medias
{
    /// <summary>
    /// Implementation of our IMediaService interface.
    /// </summary>
    public class MediaService : IMediaService
    {
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;

        public MediaService(IOptions<CloudinarySettings> config)
        {
            var account = new Account(config.Value.CloudName,
                                      config.Value.ApiKey,
                                      config.Value.ApiSecret);

            _cloudinary = new CloudinaryDotNet.Cloudinary(account);
        }

        public async Task<CloudinaryUploadResult?> AddMedia(IFormFile file)
        {
            if (file.Length > 0)
            {
                /// The `using` keyword is used for indicating the method to get rid off the object
                /// once we are done with it since it will consume memory (IDisposable).
                await using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error is not null)
                    throw new Exception(uploadResult.Error.Message);

                return new CloudinaryUploadResult { PublicId = uploadResult.PublicId, Url = uploadResult.SecureUrl.ToString() };
            }

            return null;
        }

        public async Task<string?> DeleteMedia(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result.Result == "ok" ? result.Result : null;
        }
    }
}
