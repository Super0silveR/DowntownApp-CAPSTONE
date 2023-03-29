namespace Infrastructure.Medias.Cloudinary
{
    /// <summary>
    /// Class that represents the Cloudinary configurations for accessing the cloud solution.
    /// </summary>
    public class CloudinarySettings
    {
        public string? CloudName { get; set; }
        public string? ApiKey { get; set; }
        public string? ApiSecret { get; set; }
    }
}
