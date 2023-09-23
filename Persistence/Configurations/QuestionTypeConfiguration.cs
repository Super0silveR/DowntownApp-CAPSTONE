using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class QuestionTypeConfiguration : IEntityTypeConfiguration<QuestionType>
    {
        public void Configure(EntityTypeBuilder<QuestionType> builder)
        {
            builder.HasMany(qt => qt.TypedQuestions)
                   .WithOne(q => q.QuestionType)
                   .HasForeignKey(q => q.QuestionTypeId)
                   .HasConstraintName("FK_QUESTION_TYPE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
