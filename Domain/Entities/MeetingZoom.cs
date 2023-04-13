using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents a meeting zoom.
    /// </summary>
    public class MeetingZoom : BaseAuditableEntity
    {
        public Guid? MeetingZoomTypeId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual MeetingZoomType? MeetingZoomType { get; set; }

        public virtual ICollection<UserMeetingZoom> MeetingZoomUsers { get; set; } = new HashSet<UserMeetingZoom>();
        public virtual ICollection<UserMeeting> UserMeetings { get; set; } = new HashSet<UserMeetings>();
    }