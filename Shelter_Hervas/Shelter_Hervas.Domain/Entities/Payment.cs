using System.ComponentModel.DataAnnotations.Schema;
//import Shelter_Hervas.Domain.Entities.enums.PaymentStatus;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db Payments
//•	Payment_ID: int (PK)
//•	PayMethod: string
//•	Date: date
//•	Price: double
//•	Process: PaymentStatus
//•	Refund: bool

[Table(nameof(Payment))]
public class Payment : Entity<int>
{
    public required string? PayMethod { get; set; }
    public required DateTime PayDate { get; set; }
    public required int Price { get; set; }
    public required PaymentStatus PaymentStatus { get; set; }
    public required bool Refund { get; set; }
}