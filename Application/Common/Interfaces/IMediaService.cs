using Application.Medias.Cloudinary;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces
{
    /// <summary>
    /// Interface representing our media service. 
    /// Note that this NEVER interacts with our database. It is purely for our cloud solution.
    /// </summary>
    public interface IMediaService
    {
        /// <summary>
        /// Upload a new media to our cloud service.
        /// </summary>
        /// <param name="file">Represents the file inside the http request. Comes with a load of attributes that you expect from a media.</param>
        /// <returns></returns>
        Task<CloudinaryUploadResult?> AddMedia(IFormFile file);

        /// <summary>
        /// Delete a media from our cloud service.
        /// </summary>
        /// <param name="publicId">Media public unique identifier.</param>
        /// <returns></returns>
        Task<string?> DeleteMedia(string publicId);
    }
}
