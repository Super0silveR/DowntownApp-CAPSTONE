using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents additionnal informations on a user when they become a 'creator' on the platform.
    /// </summary>
    public class CreatorProfiles : BaseAuditableEntity
    {
        public Guid UserId { get; set; }
        public string? Collaborations { get; set; }
        public string? PastExperiences { get; set; }
        public string? StandOut { get; set; }
        public string? LogoUrl { get; set; }

        public virtual User? Creator { get; set; }

        public virtual ICollection<CreatorContentGenres> CreatorContentGenres { get; set; } = new HashSet<CreatorContentGenres>();
        public virtual ICollection<CreatorReviews> CreatorReviews { get; set; } = new HashSet<CreatorReviews>();
    }
}
