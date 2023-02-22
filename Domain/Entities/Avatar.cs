using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents a user's avatar.
    /// </summary>
    public class Avatar : BaseAuditableEntity
    {
        public Guid UserId { get; set; }
        public string? Url { get; set; }

        public virtual User? User { get; set; }
    }
}
