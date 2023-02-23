using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventTypeConfiguration : IEntityTypeConfiguration<EventType>
    {
        public void Configure(EntityTypeBuilder<EventType> builder)
        {
            builder.HasMany(et => et.TypedEvents)
                   .WithOne(e => e.EventType)
                   .HasForeignKey(e => e.EventTypeId)
                   .HasConstraintName("FK_EVENT_TYPE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
