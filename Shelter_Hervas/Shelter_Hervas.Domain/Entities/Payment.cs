using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(Payment))]
public class Payment : Entity<int>
{
    [MaxLength(30)]
    public required string PayMethod { get; set; }
    
    public required DateTime PayDate { get; set; }
    
    public required decimal Price { get; set; }
    
    public required PaymentStatus PaymentStatus { get; set; }
    
    public required bool Refund { get; set; }
    
    public Donation? Donation { get; set; }

}