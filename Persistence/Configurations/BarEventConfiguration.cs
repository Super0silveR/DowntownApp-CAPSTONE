using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class BarEventConfiguration : IEntityTypeConfiguration<BarEvent>
    {
        public void Configure(EntityTypeBuilder<BarEvent> builder)
        {
            builder.HasOne(be => be.Event)
                   .WithMany(e => e.ScheduledBarEvents)
                   .HasForeignKey(be => be.EventId)
                   .HasConstraintName("FK_BAR_EVENT_EVENT_ID");

            builder.HasOne(be => be.Bar)
                   .WithMany(b => b.ScheduledEvents)
                   .HasForeignKey(be => be.BarId)
                   .HasConstraintName("FK_BAR_EVENT_BAR_ID");

            builder.HasMany(be => be.Attendees)
                   .WithOne(bea => bea.BarEvent)
                   .HasForeignKey(bea => bea.BarEventId)
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(be => be.Challenges)
                   .WithOne(c => c.BarEvent)
                   .HasForeignKey(c => c.BarEventId)
                   .HasConstraintName("FK_BAR_EVENT_CHALLENGES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(be => be.Comments)
                   .WithOne(c => c.BarEvent)
                   .HasForeignKey(c => c.BarEventId)
                   .HasConstraintName("FK_BAR_EVENT_COMMENTS")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
