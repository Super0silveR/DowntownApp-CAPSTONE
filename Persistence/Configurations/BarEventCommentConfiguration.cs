using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class BarEventCommentConfiguration : IEntityTypeConfiguration<BarEventComment>
    {
        public void Configure(EntityTypeBuilder<BarEventComment> builder)
        {
            builder.HasOne(bec => bec.BarEventAttendee)
                   .WithMany(be => be.BarEventComments)
                   .HasForeignKey(bec => new { bec.BarEventId, bec.AttendeeId })
                   .HasConstraintName("FK_BAR_EVENT_COMMENT_BAR_EVENT_ID_ATTENDEE_ID");
        }
    }
}
