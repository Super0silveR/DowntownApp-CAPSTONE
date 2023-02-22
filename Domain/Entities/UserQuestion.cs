using Domain.Common;

namespace Domain.Entities
{
    public class UserQuestion : BaseAuditableEntity
    {
        public Guid QuestionId { get; set; }
        public Guid UserId { get; set; }
        public string? Answer { get; set; }

        public virtual Question? Question { get; set; }
        public virtual User? User { get; set; }
    }
}
