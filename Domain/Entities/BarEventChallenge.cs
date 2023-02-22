using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the collection of challenges during a certain event at a certain bar.
    /// </summary>
    public class BarEventChallenge : BaseEntity
    {
        public Guid BarEventId { get; set; }
        public Guid ChallengeId { get; set; }
        public Guid? ParentChallengeId { get; set; }
        public Guid? NextChallengeId { get; set; }

        public virtual BarEvent? BarEvent { get; set; }
        public virtual Challenge? Challenge { get; set; }
    }
}
