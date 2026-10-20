using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(Breed))]
public class Breed : Entity<int>
{
    [MaxLength(100)]
    public required string BreedName { get; set; }
    
    public int SpeciesId { get; set; }
    public Species Species { get; set; } = null!;
    
    public ICollection<Animal> Animals { get; set; } = new List<Animal>();

}