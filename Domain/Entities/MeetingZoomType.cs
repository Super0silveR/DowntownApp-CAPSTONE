using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the type available for a meeting zoom.
    /// </summary>
    public class MeetingZoomType : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<MeetingZoom> TypedMeetingZooms { get; set; } = new HashSet<ChatRoom>();
    }
}