using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents a chat room.
    /// </summary>
    public class ChatRoom : BaseAuditableEntity
    {
        public Guid? ChatRoomTypeId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ChatRoomType? ChatRoomType { get; set; }

        public virtual ICollection<UserChatRoom> ChatRoomUsers { get; set; } = new HashSet<UserChatRoom>();
        public virtual ICollection<UserChat> UserChats { get; set; } = new HashSet<UserChat>();
    }
}
