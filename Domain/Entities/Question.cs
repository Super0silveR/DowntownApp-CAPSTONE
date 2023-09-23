using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the different questions available for user to apply 
    /// to their profile.
    /// </summary>
    public class Question : BaseAuditableEntity
    {
        public Guid QuestionTypeId { get; set; }
        public string? Value { get; set; }

        public virtual QuestionType? QuestionType { get; set; }

        public virtual ICollection<UserQuestion> UserQuestions { get; set; } = new HashSet<UserQuestion>();
    }
}
