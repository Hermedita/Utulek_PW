using System.ComponentModel.DataAnnotations.Schema;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(AdoptionRequest))]
public class AdoptionRequest : Entity<int>
{
    public required RequestStatus RequestStatus { get; set; }
    
    public int AnimalId { get; set; }
    public Animal Animal { get; set; } = null!;
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public Adoption? Adoption { get; set; }
}