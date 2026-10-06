using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Donation
//•	User_ID: int (FK)
//•	Payment_ID: int (FK)

[Table(nameof(Donation))]
public class Donation : Entity<int>
{
    [ForeignKey(nameof(User))] public User UserId { get;}
    [ForeignKey(nameof(Payment))] public Payment PaymentId { get;}
}