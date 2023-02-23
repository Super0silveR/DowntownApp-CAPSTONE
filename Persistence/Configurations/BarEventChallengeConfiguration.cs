using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class BarEventChallengeConfiguration : IEntityTypeConfiguration<BarEventChallenge>
    {
        public void Configure(EntityTypeBuilder<BarEventChallenge> builder)
        {
            builder.HasKey(bec => new { bec.BarEventId, bec.ChallengeId })
                   .HasName("PK_BAR_EVENT_CHALLENGE_ID");

            builder.HasOne(bec => bec.Challenge)
                   .WithMany(c => c.BarEventChallenges)
                   .HasForeignKey(bec => bec.ChallengeId)
                   .HasConstraintName("FK_BAR_EVENT_CHALLENGE_CHALLENGE_ID");

            builder.HasOne(bec => bec.BarEvent)
                   .WithMany(c => c.Challenges)
                   .HasForeignKey(bec => bec.BarEventId)
                   .HasConstraintName("FK_BAR_EVENT_CHALLENGE_BAR_EVENT_ID");
        }
    }
}
