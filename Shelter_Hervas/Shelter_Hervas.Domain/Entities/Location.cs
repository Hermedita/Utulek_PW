using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(Location))]
public class Location : Entity<int>
{
    public required string Place { get; set; }
    
    public ICollection<AnimalListing> AnimalListings { get; set; } = new List<AnimalListing>();

}