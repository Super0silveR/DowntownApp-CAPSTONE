using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasOne(e => e.Creator)
                   .WithMany(u => u.CreatedEvents)
                   .HasForeignKey(e => e.CreatorId)
                   .HasConstraintName("FK_EVENT_CREATOR_ID");

            builder.HasOne(e => e.EventType)
                   .WithMany(et => et.TypedEvents)
                   .HasForeignKey(e => e.EventTypeId)
                   .HasConstraintName("FK_EVENT_EVENT_TYPE_ID");

            builder.HasOne(e => e.Category)
                   .WithMany(ec => ec.CategorizedEvents)
                   .HasForeignKey(e => e.EventCategoryId)
                   .HasConstraintName("FK_EVENT_EVENT_CATEGORY_ID");

            builder.HasMany(e => e.Contributors)
                   .WithOne(ec => ec.Event)
                   .HasForeignKey(ec => ec.EventId)
                   .HasConstraintName("FK_EVENT_EVENT_CONTRIBUTORS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(e => e.Ratings)
                   .WithOne(er => er.Event)
                   .HasForeignKey(be => be.EventId)
                   .HasConstraintName("FK_EVENT_EVENT_RATINGS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(e => e.ScheduledEvents)
                   .WithOne(be => be.Event)
                   .HasForeignKey(be => be.EventId)
                   .HasConstraintName("FK_EVENT_SCHEDULED_BAR_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
