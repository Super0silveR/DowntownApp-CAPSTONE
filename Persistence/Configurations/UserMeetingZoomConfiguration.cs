using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserMeetingZoomConfiguration : IEntityTypeConfiguration<UserMeetingZoom>
    {
        public void Configure(EntityTypeBuilder<UserMeetingZoom> builder)
        {
            builder.HasKey(umz => new { umz.MeetingZoomId, umz.UserId })
                   .HasName("PK_USER_MEETING_ZOOM_ID");

            builder.HasOne(umz => umz.MeetingZoom)
                   .WithMany(mz => mz.MeetingZoomUsers)
                   .HasForeignKey(umz => umz.MeetingZoomId)
                   .HasConstraintName("FK_USER_MEETING_ZOOM_MEETING_ZOOM_ID");

            builder.HasOne(umz => umz.User)
                   .WithMany(u => u.UserMeetingZooms)
                   .HasForeignKey(umz => umz.UserId)
                   .HasConstraintName("FK_USER_MEETING_ZOOM_USER_ID");
        }
    }
}