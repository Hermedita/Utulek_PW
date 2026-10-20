using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(Adoption))]
public class Adoption : Entity<int>
{
    public int AdoptionRequestId {get; set;}
    public AdoptionRequest AdoptionRequest { get; set; } = null!;
}