using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventChallengeConfiguration : IEntityTypeConfiguration<EventChallenge>
    {
        public void Configure(EntityTypeBuilder<EventChallenge> builder)
        {
            builder.HasKey(bec => new { bec.EventId, bec.ChallengeId })
                   .HasName("PK_BAR_EVENT_CHALLENGE_ID");

            builder.HasOne(bec => bec.Challenge)
                   .WithMany(c => c.EventChallenges)
                   .HasForeignKey(bec => bec.ChallengeId)
                   .HasConstraintName("FK_BAR_EVENT_CHALLENGE_CHALLENGE_ID");

            builder.HasOne(bec => bec.Event)
                   .WithMany(c => c.Challenges)
                   .HasForeignKey(bec => bec.EventId)
                   .HasConstraintName("FK_BAR_EVENT_CHALLENGE_BAR_EVENT_ID");
        }
    }
}
