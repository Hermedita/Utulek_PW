using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class DonationConfiguration : IEntityTypeConfiguration<Donation>
{
    public void Configure(EntityTypeBuilder<Donation> builder)
    {
        builder.HasOne(d => d.User)
            .WithMany(u => u.Donations)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();
 
        builder.HasOne(d => d.Payment)
            .WithOne(p => p.Donation)
            .HasForeignKey<Donation>(d => d.PaymentId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();
    }
}
/*
        modelBuilder.Entity<Donation>(entity =>
        {
            entity.HasOne(d => d.User)
                .WithMany(u => u.Donations)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            entity.HasOne(d => d.Payment)
                .WithOne(p => p.Donation)
                .HasForeignKey<Donation>(d => d.PaymentId)   //one to one
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        });
*/