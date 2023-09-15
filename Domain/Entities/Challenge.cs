using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents different challenges a content creator can associate
    /// with a specific scheduled event.
    /// </summary>
    public class Challenge : BaseAuditableEntity
    {
        public Guid ChallengeTypeId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Rules { get; set; }

        public virtual ChallengeType? ChallengeType { get; set; }

        public virtual ICollection<EventChallenge> EventChallenges { get; set; } = new HashSet<EventChallenge>();
    }
}
