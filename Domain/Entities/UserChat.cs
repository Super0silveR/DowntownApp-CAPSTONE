using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the chats associated to a user chat room.
    /// </summary>
    public class UserChat : BaseEntity
    {
        public Guid ChatRoomId { get; set; }
        public Guid UserId { get; set; }
        public string? Message { get; set; }

        public virtual UserChatRoom? UserChatRoom { get; set; }
        public virtual ChatRoom? ChatRoom { get; set; }
        public virtual User? User { get; set; }
    }
}
