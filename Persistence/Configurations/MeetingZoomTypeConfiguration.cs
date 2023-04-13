using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class MeetingZoomTypeConfiguration : IEntityTypeConfiguration<MeetingZoomType>
    {
        public void Configure(EntityTypeBuilder<MeetingZoomType> builder)
        {
            builder.HasMany(mzt => mzt.TypedMeetingZooms)
                   .WithOne(m => c.MeetingZoomType)
                   .HasForeignKey(m => c.MeetingZoomTypeId)
                   .HasConstraintName("FK_MEETING_ZOOM_TYPE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}