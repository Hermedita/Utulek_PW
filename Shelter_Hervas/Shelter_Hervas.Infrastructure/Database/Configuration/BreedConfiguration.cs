using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class BreedConfiguration : IEntityTypeConfiguration<Breed>
{
    public void Configure(EntityTypeBuilder<Breed> builder)
    {
        builder.Property(b => b.BreedName)
            .IsRequired()
            .HasMaxLength(100);
 
        builder.HasIndex(b => new { b.SpeciesId, b.BreedName })
            .IsUnique();
 
        builder.HasOne(b => b.Species)
            .WithMany(s => s.Breeds)
            .HasForeignKey(b => b.SpeciesId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();
    }
}
/*
        modelBuilder.Entity<Breed>(entity =>
        {
            entity.Property(b => b.BreedName)
                .IsRequired() // is required
                .HasMaxLength(100);
            
            entity.HasIndex(b => new { b.SpeciesId, b.BreedName })
                .IsUnique();
            
            entity.HasOne(b => b.Species)
                .WithMany(s => s.Breeds)
                .HasForeignKey(b => b.SpeciesId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        });
*/