using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class AdoptionRequestConfiguration : IEntityTypeConfiguration<AdoptionRequest>
{
    public void Configure(EntityTypeBuilder<AdoptionRequest> builder)
    {
        builder.Property(ar => ar.RequestStatus)
            .IsRequired();
 
        builder.HasOne(ar => ar.Animal)
            .WithMany(a => a.AdoptionRequests)
            .HasForeignKey(ar => ar.AnimalId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        builder.HasOne(ar => ar.User)
            .WithMany(u => u.AdoptionRequests)
            .HasForeignKey(ar => ar.UserId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

    }
    
}
/*
modelBuilder.Entity<AdoptionRequest>(entity =>
{
    entity.Property(ar => ar.RequestStatus)
        .IsRequired();  // is required
            
    entity.HasOne(a => a.Animal)
        .WithMany(ar => ar.AdoptionRequests)
        .HasForeignKey(ar => ar.AnimalId)
        .OnDelete(DeleteBehavior.Restrict)
        .IsRequired();  // is required

    entity.HasOne(u => u.User)
        .WithMany(ar => ar.AdoptionRequests)
        .HasForeignKey(ar => ar.UserId)
        .OnDelete(DeleteBehavior.Restrict)  //kaskady
        .IsRequired();  // is required
});*/