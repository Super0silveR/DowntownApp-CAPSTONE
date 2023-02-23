using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasOne(q => q.QuestionType)
                   .WithMany(qt => qt.TypedQuestions)
                   .HasForeignKey(q => q.QuestionTypeId)
                   .HasConstraintName("FK_QUESTION_QUESTION_TYPE_ID");

            builder.HasMany(q => q.UserQuestions)
                   .WithOne(uq => uq.Question)
                   .HasForeignKey(uq => new { uq.QuestionId, uq.UserId })
                   .HasConstraintName("FK_QUESTION_USER_QUESTION_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
