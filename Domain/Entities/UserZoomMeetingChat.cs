using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the different chat rooms for a user.
    /// </summary>
    public class UserZoomMeetingChat : BaseAuditableEntity
    {
        public Guid ZoomMeetingId { get; set; }
        public Guid UserId { get; set; }

        public virtual ZoomMeeting? ZoomMeeting { get; set; }
        public virtual User? User { get; set; }
    }
}
