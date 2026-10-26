using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class SpeciesConfiguration : IEntityTypeConfiguration<Species>
{
    public void Configure(EntityTypeBuilder<Species> builder)
    {
        builder.Property(s => s.SpeciesName)
            .IsRequired()
            .HasMaxLength(100);
 
        builder.HasIndex(s => s.SpeciesName)
            .IsUnique();
    }
}

/*
        modelBuilder.Entity<Species>(entity =>
        {
            entity.Property(s => s.SpeciesName)
                .IsRequired()
                .HasMaxLength(100);
            entity.HasIndex(s => s.SpeciesName)
                .IsUnique();
        });
*/