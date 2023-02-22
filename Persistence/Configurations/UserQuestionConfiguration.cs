using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserQuestionConfiguration : IEntityTypeConfiguration<UserQuestion>
    {
        public void Configure(EntityTypeBuilder<UserQuestion> builder)
        {
            builder.HasKey(uq => new { uq.QuestionId, uq.UserId })
                   .HasName("PK_USER_QUESTION_ID");

            builder.HasOne(uq => uq.Question)
                   .WithMany(q => q.UserQuestions)
                   .HasForeignKey(uq => uq.QuestionId)
                   .HasConstraintName("FK_USER_QUESTION_QUESTION_ID");

            builder.HasOne(uq => uq.User)
                   .WithMany(u => u.Questions)
                   .HasForeignKey(uq => uq.UserId)
                   .HasConstraintName("FK_USER_QUESTION_USER_ID");
        }
    }
}
