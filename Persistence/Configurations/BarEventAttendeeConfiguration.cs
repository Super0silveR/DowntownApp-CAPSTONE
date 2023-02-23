using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class BarEventAttendeeConfiguration : IEntityTypeConfiguration<BarEventAttendee>
    {
        public void Configure(EntityTypeBuilder<BarEventAttendee> builder)
        {
            builder.HasKey(ea => new { ea.AttendeeId, ea.BarEventId })
                   .HasName("PK_BAR_EVENT_ATTENDEE_ID");

            builder.HasOne(ea => ea.Attendee)
                   .WithMany(a => a.AttendedBarEvents)
                   .HasForeignKey(ea => ea.AttendeeId)
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEE_ATTENDEE_ID");

            builder.HasOne(ea => ea.BarEvent)
                   .WithMany(e => e.Attendees)
                   .HasForeignKey(ea => ea.BarEventId)
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEE_BAR_EVENT_ID");

            builder.HasMany(bea => bea.BarEventComments)
                   .WithOne(bec => bec.BarEventAttendee)
                   .HasForeignKey(bec => new { bec.AttendeeId, bec.BarEventId })
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEE_COMMENTS");
        }
    }
}
