using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserPhotoConfiguration : IEntityTypeConfiguration<UserPhoto>
    {
        public void Configure(EntityTypeBuilder<UserPhoto> builder)
        {
            builder.HasOne(up => up.User)
                   .WithMany(u => u.Photos)
                   .HasForeignKey(up => up.UserId)
                   .HasConstraintName("FK_USER_PHOTO_USER_ID");
        }
    }
}
