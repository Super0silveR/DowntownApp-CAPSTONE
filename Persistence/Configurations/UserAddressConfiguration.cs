using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserAddressConfiguration : IEntityTypeConfiguration<UserAddress>
    {
        public void Configure(EntityTypeBuilder<UserAddress> builder)
        {
            builder.HasKey(ua => new { ua.AddressId, ua.UserId })
                   .HasName("PK_USER_ADDRESS_ID");

            builder.HasOne(ua => ua.Adddress)
                   .WithOne(a => a.UserAddress)
                   .HasForeignKey<UserAddress>(ua => ua.AddressId)
                   .HasConstraintName("FK_USER_ADDRESS_ADDRESS_ID");

            builder.HasOne(ua => ua.User)
                   .WithMany(u => u.Addresses)
                   .HasForeignKey(ua => ua.UserId)
                   .HasConstraintName("FK_USER_ADDRESS_USER_ID");
        }
    }
}
