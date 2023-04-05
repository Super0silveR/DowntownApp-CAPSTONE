using Domain.Common;
using System;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents a Zoom meeting.
    /// </summary>
    public class ZoomMeeting : BaseAuditableEntity
    {
        public Guid? ZoomMeetingTypeId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public virtual ZoomMeetingType? ZoomMeetingType { get; set; }

        public virtual ICollection<UserZoomMeeting> ZoomMeetingUsers { get; set; } = new HashSet<UserZoomMeeting>();
        public virtual ICollection<UserZoomMeetingChat> UserZoomMeetingChats { get; set; } = new HashSet<UserZoomMeetingChat>();
    }
}
