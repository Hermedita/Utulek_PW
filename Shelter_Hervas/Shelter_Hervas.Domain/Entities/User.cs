using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(User))]
public class User : Entity<int>
{
    public required RoleEnum Role { get; set; }
    
    public required string LoginName { get; set; }

    public required string Email { get; set; }

    public required string PasswordHash { get; set; }
    public required string PasswordSalt { get; set; }
    
    
    public ICollection<AdoptionRequest> AdoptionRequests { get; set; } = new List<AdoptionRequest>();
    public ICollection<Donation> Donations { get; set; } = new List<Donation>();

}