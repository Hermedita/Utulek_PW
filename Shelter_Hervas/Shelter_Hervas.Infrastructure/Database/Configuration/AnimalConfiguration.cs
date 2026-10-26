using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class AnimalConfiguration : IEntityTypeConfiguration<Animal>
{
    public void Configure(EntityTypeBuilder<Animal> builder)
    {
        builder.Property(an => an.Name)
            .HasMaxLength(100);
 
        builder.Property(an => an.Gender)
            .IsRequired(false);
 
        builder.Property(an => an.Adoptable)
            .IsRequired();
 
        builder.HasOne(an => an.Species)
            .WithMany(s => s.Animals)
            .HasForeignKey(an => an.SpeciesId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();
 
        builder.HasOne(an => an.Breed)
            .WithMany(b => b.Animals)
            .HasForeignKey(an => an.BreedId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);
    }
}
/*
        modelBuilder.Entity<Animal>(entity =>
        {
            entity.Property(an => an.Gender)
                .IsRequired(false); // is optional
            
            entity.HasOne(an => an.Species)
                .WithMany(s => s.Animals)
                .HasForeignKey(an => an.SpeciesId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();  // is required

            entity.HasOne(an => an.Breed)
                .WithMany(b => b.Animals)
                .HasForeignKey(an => an.BreedId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false); // is optional

            entity.Property(an => an.Adoptable)
                .IsRequired();  // is required
        });
*/