using Shelter_Hervas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shelter_Hervas.Infrastructure.Database.Configuration;

public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.Property(p => p.PayMethod)
            .IsRequired()
            .HasMaxLength(30);
 
        builder.Property(p => p.PayDate)
            .IsRequired();
 
        builder.Property(p => p.Price)
            .HasPrecision(18, 2)
            .IsRequired();
 
        builder.Property(p => p.PaymentStatus)
            .IsRequired();
 
        builder.Property(p => p.Refund)
            .IsRequired();
    }
}

/*
        modelBuilder.Entity<Payment>(entity =>
        {
            entity.Property(p => p.PayMethod)
                .HasMaxLength(30)
                .IsRequired();

            entity.Property(p => p.PayDate)
                .IsRequired();

            entity.Property(p => p.Price)
                .HasPrecision(18, 2)
                .IsRequired();

            entity.Property(p => p.PaymentStatus)
                .IsRequired();
        });
*/