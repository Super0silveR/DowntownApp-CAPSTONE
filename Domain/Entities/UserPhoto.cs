using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity responsible for holding user photos.
    /// </summary>
    public class UserPhoto
    {
        public string? Id { get; set; }
        public Guid UserId { get; set; }
        public string? Url { get; set; }
        public bool IsMain { get; set; }
    }
}
