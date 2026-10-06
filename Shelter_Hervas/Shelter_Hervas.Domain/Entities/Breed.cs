using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db Breeds
//•	Breed_ID: int (PK)
//•	Breed: string

[Table(nameof(Breed))]
public class Breed : Entity<int>
{
    public required string Type { get; set; }
}