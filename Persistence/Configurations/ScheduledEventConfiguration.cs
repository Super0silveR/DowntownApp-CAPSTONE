using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ScheduledEventConfiguration : IEntityTypeConfiguration<ScheduledEvent>
    {
        public void Configure(EntityTypeBuilder<ScheduledEvent> builder)
        {
            builder.HasOne(be => be.Event)
                   .WithMany(e => e.ScheduledEvents)
                   .HasForeignKey(be => be.EventId)
                   .HasConstraintName("FK_BAR_EVENT_EVENT_ID");

            builder.HasOne(be => be.Bar)
                   .WithMany(b => b.ScheduledEvents)
                   .HasForeignKey(be => be.BarId)
                   .HasConstraintName("FK_BAR_EVENT_BAR_ID");

            builder.HasMany(be => be.Attendees)
                   .WithOne(bea => bea.Event)
                   .HasForeignKey(bea => bea.ScheduledEventId)
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(be => be.Challenges)
                   .WithOne(c => c.Event)
                   .HasForeignKey(c => c.EventId)
                   .HasConstraintName("FK_BAR_EVENT_CHALLENGES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(be => be.Comments)
                   .WithOne(c => c.Event)
                   .HasForeignKey(c => c.EventId)
                   .HasConstraintName("FK_BAR_EVENT_COMMENTS")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
