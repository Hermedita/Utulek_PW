using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db Roles
//•	Role_ID: int (PK)
//•	Title: string


[Table(nameof(Role))]
public class Role: Entity<int>
{
    public required string Title {get;set;}
}