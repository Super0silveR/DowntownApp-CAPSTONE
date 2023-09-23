using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class AvatarConfiguration : IEntityTypeConfiguration<Avatar>
    {
        public void Configure(EntityTypeBuilder<Avatar> builder)
        {
            builder.HasOne(av => av.User)
                   .WithOne(u => u.Avatar)
                   .HasForeignKey<Avatar>(av => av.UserId);
        }
    }
}
