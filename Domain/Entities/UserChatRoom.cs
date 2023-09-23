using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the different chat rooms for a user.
    /// </summary>
    public class UserChatRoom : BaseAuditableEntity
    {
        public Guid ChatRoomId { get; set; }
        public Guid UserId { get; set; }

        public virtual ChatRoom? ChatRoom { get; set; }
        public virtual User? User { get; set; }
    }
}
