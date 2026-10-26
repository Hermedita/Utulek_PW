using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class AnimalListingConfiguration : IEntityTypeConfiguration<AnimalListing>
{
    public void Configure(EntityTypeBuilder<AnimalListing> builder)
    {
        builder.Property(al => al.ListingStatus)
            .IsRequired();
 
        builder.Property(al => al.Description)
            .HasMaxLength(500);
 
        builder.Property(al => al.Image)
            .HasMaxLength(200);
 
        builder.HasOne(al => al.Animal)
            .WithMany(a => a.AnimalListings)
            .HasForeignKey(al => al.AnimalId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
 
        builder.HasOne(al => al.Location)
            .WithMany(l => l.AnimalListings)
            .HasForeignKey(al => al.LocationId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);
    }
}
/*
        modelBuilder.Entity<AnimalListing>(entity =>
        {
            entity.Property(al => al.ListingStatus)
                .HasConversion<string>()
                .IsRequired();

            entity.HasOne(al => al.Animal)
                .WithMany(a => a.AnimalListings)
                .HasForeignKey(al => al.AnimalId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();  // AnimalId is required

            entity.HasOne(al => al.Location)
                .WithMany(l => l.AnimalListings)
                .HasForeignKey(al => al.LocationId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false); // LocationId is optional
        });
*/