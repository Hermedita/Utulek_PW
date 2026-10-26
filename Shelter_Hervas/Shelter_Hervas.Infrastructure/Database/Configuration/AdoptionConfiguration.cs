using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class AdoptionConfiguration : IEntityTypeConfiguration<Adoption>
{
    public void Configure(EntityTypeBuilder<Adoption> builder)
    {
        builder.HasOne(ad => ad.AdoptionRequest)
            .WithOne(ar => ar.Adoption)
            .HasForeignKey<Adoption>(a => a.AdoptionRequestId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();
    }
    
}


/*
//////////////////////////////////////////////////////////////////////
//Adoption
modelBuilder.Entity<Adoption>(entity =>
{
    entity.HasOne(ad => ad.AdoptionRequest)
        .WithOne(ar => ar.Adoption)
        .HasForeignKey<Adoption>(ad => ad.AdoptionRequestId)
        .OnDelete(DeleteBehavior.Restrict)
        .IsRequired();  // is required
});
*/