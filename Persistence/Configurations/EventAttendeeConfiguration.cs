using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventAttendeeConfiguration : IEntityTypeConfiguration<EventAttendee>
    {
        public void Configure(EntityTypeBuilder<EventAttendee> builder)
        {
            builder.HasKey(ea => new { ea.AttendeeId, ea.ScheduledEventId })
                   .HasName("PK_BAR_EVENT_ATTENDEE_ID");

            builder.HasOne(ea => ea.Attendee)
                   .WithMany(a => a.AttendedEvents)
                   .HasForeignKey(ea => ea.AttendeeId)
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEE_ATTENDEE_ID");

            builder.HasOne(ea => ea.Event)
                   .WithMany(e => e.Attendees)
                   .HasForeignKey(ea => ea.ScheduledEventId)
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEE_BAR_EVENT_ID");

            builder.HasMany(bea => bea.EventComments)
                   .WithOne(bec => bec.EventAttendee)
                   .HasForeignKey(bec => new { bec.AttendeeId, bec.EventId })
                   .HasConstraintName("FK_BAR_EVENT_ATTENDEE_COMMENTS");
        }
    }
}
