using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(Species))]
public class Species : Entity<int>
{
    public required string SpeciesName { get; set; }
    
    public ICollection<Animal> Animals { get; set; } = new List<Animal>();
    public ICollection<Breed> Breeds { get; set; } = new List<Breed>();

}