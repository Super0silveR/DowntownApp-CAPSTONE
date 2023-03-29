namespace Application.Medias.Cloudinary
{
    /// <summary>
    /// Class that represents the upload result from Cloudinary.
    /// @Url is the actual link to the media.
    /// @PublicId is the unique identifier.
    /// </summary>
    public class CloudinaryUploadResult
    {
        public string? PublicId { get; set; }
        public string? Url { get; set; }
    }
}
