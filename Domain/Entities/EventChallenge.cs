using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the collection of challenges during a certain event at a certain bar.
    /// </summary>
    public class EventChallenge : BaseEntity
    {
        public Guid EventId { get; set; }
        public Guid ChallengeId { get; set; }
        public Guid? ParentChallengeId { get; set; }
        public Guid? NextChallengeId { get; set; }

        public virtual ScheduledEvent? Event { get; set; }
        public virtual Challenge? Challenge { get; set; }
    }
}
