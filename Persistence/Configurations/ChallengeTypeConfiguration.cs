using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ChallengeTypeConfiguration : IEntityTypeConfiguration<ChallengeType>
    {
        public void Configure(EntityTypeBuilder<ChallengeType> builder)
        {
            builder.HasMany(ct => ct.TypedChallenges)
                   .WithOne(c => c.ChallengeType)
                   .HasForeignKey(c => c.ChallengeTypeId)
                   .HasConstraintName("FK_CHALLENGE_TYPE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
