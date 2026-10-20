using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;
//muze byt mesicni + virtalni adopce

[Table(nameof(Donation))]
public class Donation : Entity<int>
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int PaymentId { get; set; }
    public Payment Payment { get; set; } = null!;
    
}