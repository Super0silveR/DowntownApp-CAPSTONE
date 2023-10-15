using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class SocialConfiguration : IEntityTypeConfiguration<Socials>
    {
        public void Configure(EntityTypeBuilder<Socials> builder)
        {
            builder.HasAlternateKey(s => new { s.UserId, s.SocialType })
                   .HasName("PK_USER_SOCIAL_TYPE_ID");

            builder.HasOne(s => s.User)
                   .WithMany(u => u.UserSocials)
                   .HasForeignKey(s => s.UserId)
                   .HasConstraintName("FK_USER_ID");
        }
    }
}
