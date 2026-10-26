using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.Role)
            .IsRequired();
 
        builder.Property(u => u.LoginName)
            .IsRequired()
            .HasMaxLength(50);
        builder.HasIndex(u => u.LoginName)
            .IsUnique();
 
        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(254);
        builder.HasIndex(u => u.Email)
            .IsUnique();
 
        builder.Property(u => u.PasswordHash)
            .IsRequired()
            .HasMaxLength(200);
 
        builder.Property(u => u.PasswordSalt)
            .IsRequired()
            .HasMaxLength(100);

    }
    
}
/*
        //User
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.Role)
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(u => u.LoginName)
                .IsRequired()
                .HasMaxLength(50);
            entity.HasIndex(u => u.LoginName)
                .IsUnique();
            
            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(254);
            entity.HasIndex(u => u.Email)
                .IsUnique();

            entity.Property(u => u.PasswordHash)
                .HasMaxLength(200);         
            
            entity.Property(u => u.PasswordSalt)
                .HasMaxLength(100);
        });
*/