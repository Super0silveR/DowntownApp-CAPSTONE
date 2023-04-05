using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the type available for a Zoom meeting.
    /// </summary>
    public class ZoomMeetingType : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<ZoomMeeting> TypedZoomMeetings { get; set; } = new HashSet<ZoomMeeting>();
    }
}
