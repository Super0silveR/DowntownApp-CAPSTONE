using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity responsible for holding user photos.
    /// </summary>
    public class UserPhoto : BaseEntity
    {
        public Guid UserId { get; set; }
        public string? Url { get; set; }

        public virtual User? User { get; set; }
    }
}
