using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserMeetingConfiguration : IEntityTypeConfiguration<UserMeeting>
    {
        public void Configure(EntityTypeBuilder<UserMeeting> builder)
        {
            builder.HasOne(um => um.MeetingZoom)
                   .WithMany(mz => mz.UserMeetings)
                   .HasForeignKey(um => um.MeetingZoomId)
                   .HasConstraintName("FK_USER_MEETING_USER_MEETING_ZOOM_ID");
        }
    }
}