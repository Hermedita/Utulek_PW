using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: TypeOfCare
//•	Care_ID: int (PK)
//•	Type: string


[Table(nameof(TypeOfCare))]
public class TypeOfCare : Entity<int>
{
    public required string Type {get;set;}
}