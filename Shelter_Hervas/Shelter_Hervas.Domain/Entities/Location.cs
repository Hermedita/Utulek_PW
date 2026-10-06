using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Location
//•	Location_ID: int (PK)
//•	Place: string

[Table(nameof(Location))]
public class Location : Entity<int>
{
    public required string Place { get; set; }
}