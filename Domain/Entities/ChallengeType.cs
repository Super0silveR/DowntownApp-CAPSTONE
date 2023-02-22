using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the types available for an event challenge.
    /// </summary>
    public class ChallengeType : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Challenge> TypedChallenges { get; set; } = new HashSet<Challenge>();
    }
}
