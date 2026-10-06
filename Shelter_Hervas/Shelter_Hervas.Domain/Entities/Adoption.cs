using System.ComponentModel.DataAnnotations.Schema;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db Adoptions
//•	Adoption_ID: int (PK)
//•	AdoptRequest_ID: int (FK)
//•	Payment_ID: int (FK)

[Table(nameof(Adoption))]
public class Adoption : Entity<int>
{
    [ForeignKey(nameof(AdoptionRequest))] public required AdoptionRequest AdoptionRequestId { get; set; }
    [ForeignKey(nameof(Payment))] public required Payment PaymentId { get; set; }
}