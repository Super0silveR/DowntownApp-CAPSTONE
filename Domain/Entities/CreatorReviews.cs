using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the various reviews/comments from other users in our platform.
    /// </summary>
    public class CreatorReviews : BaseAuditableEntity
    {
        public Guid RevieweeId { get; set; }
        public Guid ReviewerId { get; set; }
        public string? Review { get; set; }

        public CreatorProfiles? Reviewee { get; set; }
        public User? Reviewer { get; set; }
    }
}
