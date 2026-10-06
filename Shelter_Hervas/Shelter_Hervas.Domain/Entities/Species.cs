using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db Species
//•	Species_ID: int (PK)
//•	Species: string
//•	Breed_ID: int (FK)


public class Species : Entity<int>
{
    public string? Type { get; set; }
    [ForeignKey(nameof(Breed))] public required Breed BreedId { get; set; }
    
}