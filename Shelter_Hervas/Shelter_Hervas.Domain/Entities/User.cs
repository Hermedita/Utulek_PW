using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db Users
//•	User_ID: int (PK)
//•	LoginName: string (U)
//•	Email: string (U)
//•	PasswordHash: string
//•	PasswordSalt: string
//•	Role_ID: int (FK)

[Table(nameof(User))]
public class User : Entity<int>
{
    public required string? LoginName { get; set; }
    public required string? Email { get; set; }
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
    [ForeignKey(nameof(Role))] public Role RoleId { get; set; }
    
}