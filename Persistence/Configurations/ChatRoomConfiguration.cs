using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ChatRoomConfiguration : IEntityTypeConfiguration<ChatRoom>
    {
        public void Configure(EntityTypeBuilder<ChatRoom> builder)
        {
            builder.HasOne(cr => cr.ChatRoomType)
                   .WithMany(crt => crt.TypedChatRooms)
                   .HasForeignKey(cr => cr.ChatRoomTypeId)
                   .HasConstraintName("FK_CHAT_ROOM_CHAT_ROOM_TYPE_ID");

            builder.HasMany(cr => cr.ChatRoomUsers)
                   .WithOne(ucr => ucr.ChatRoom)
                   .HasForeignKey(cr => new { cr.ChatRoomId, cr.UserId })
                   .HasConstraintName("FK_CHAT_ROOM_USER_CHAT_ROOM_ID")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(cr => cr.UserChats)
                   .WithOne(uc => uc.ChatRoom)
                   .HasForeignKey(uc => uc.ChatRoomId)
                   .HasConstraintName("FK_CHAT_ROOM_USER_CHAT_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
