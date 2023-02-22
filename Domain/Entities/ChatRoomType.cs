using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the type available for a chat room.
    /// </summary>
    public class ChatRoomType : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<ChatRoom> TypedChatRooms { get; set; } = new HashSet<ChatRoom>();
    }
}
