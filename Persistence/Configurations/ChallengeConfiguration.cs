using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ChallengeConfiguration : IEntityTypeConfiguration<Challenge>
    {
        public void Configure(EntityTypeBuilder<Challenge> builder)
        {
            builder.HasMany(c => c.EventChallenges)
                   .WithOne(bec => bec.Challenge)
                   .HasForeignKey(bec => bec.ChallengeId)
                   .HasConstraintName("FK_CHALLENGE_BAR_EVENT_CHALLENGES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.ChallengeType)
                   .WithMany(ct => ct.TypedChallenges)
                   .HasForeignKey(c => c.ChallengeTypeId)
                   .HasConstraintName("FK_CHALLENGE_CHALLENGE_TYPE_ID");
        }
    }
}
