using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the types available for a profile question.
    /// </summary>
    public class QuestionType : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Question> TypedQuestions { get; set; } = new HashSet<Question>();
    }
}
