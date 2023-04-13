using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class MeetingZoomConfiguration : IEntityTypeConfiguration<MeetingZoom>
    {
        public void Configure(EntityTypeBuilder<MeetingZoom> builder)
        {
             builder.HasOne(mz => mz.MeetingZoomType)
                   .WithMany(mzt => mzt.TypedMeetingZooms)
                   .HasForeignKey(mz => mz.MeetingZoomTypeId)
                   .HasConstraintName("FK_MEETING_ZOOM_MEETING_ZOOM_TYPE_ID");

            builder.HasMany(mz => mz.MeetingZoomUsers)
                   .WithOne(mzr => umz.MeetingZoom)
                   .HasForeignKey(mz=> new { mz.MeetingZoomId, mz.UserId })
                   .HasConstraintName("FK__ZOOM_USER_MEETING_ZOOM_ID")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(mz => mz.UserMeetings)
                   .WithOne(um => um.MeetingZoom)
                   .HasForeignKey(um => um.ZId)
                   .HasConstraintName("FK_MEETING_ZOOM_USER_MEETING_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}