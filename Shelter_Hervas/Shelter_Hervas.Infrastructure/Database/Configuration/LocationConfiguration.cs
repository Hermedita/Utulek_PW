using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class LocationConfiguration : IEntityTypeConfiguration<Location>
{
    public void Configure(EntityTypeBuilder<Location> builder)
    {
        builder.Property(l => l.Place)
            .IsRequired()
            .HasMaxLength(250);
 
        builder.HasIndex(l => l.Place)
            .IsUnique();
    }
    
}
/*
        //Location
        modelBuilder.Entity<Location>(entity =>
        {
            entity.Property(l => l.Place)
                .IsRequired()
                .HasMaxLength(200);
            entity.HasIndex(l => l.Place)
                .IsUnique();
        });
 */