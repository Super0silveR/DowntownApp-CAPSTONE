using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventCommentConfiguration : IEntityTypeConfiguration<EventComment>
    {
        public void Configure(EntityTypeBuilder<EventComment> builder)
        {
            builder.HasOne(bec => bec.EventAttendee)
                   .WithMany(be => be.EventComments)
                   .HasForeignKey(bec => new { bec.EventId, bec.AttendeeId })
                   .HasConstraintName("FK_BAR_EVENT_COMMENT_BAR_EVENT_ID_ATTENDEE_ID");
        }
    }
}
