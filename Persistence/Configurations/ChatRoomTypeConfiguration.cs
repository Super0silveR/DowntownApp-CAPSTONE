using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ChatRoomTypeConfiguration : IEntityTypeConfiguration<ChatRoomType>
    {
        public void Configure(EntityTypeBuilder<ChatRoomType> builder)
        {
            builder.HasMany(crt => crt.TypedChatRooms)
                   .WithOne(c => c.ChatRoomType)
                   .HasForeignKey(c => c.ChatRoomTypeId)
                   .HasConstraintName("FK_CHAT_ROOM_TYPE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
