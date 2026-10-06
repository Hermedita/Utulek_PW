using System.ComponentModel.DataAnnotations.Schema;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Domain.Entities;

//TODO: Db AdoptionRequest
//•	AdoptRequest_ID: int (PK)
//•	Status: RequestStatus
//•	Animal_ID: int (FK)
//•	User_ID: int (FK)

[Table(nameof(User))]
public class AdoptionRequest : Entity<int>
{
    public required RequestStatus RequestStatus { get; set; }
    [ForeignKey(nameof(Animal))] public required Animal AnimalId { get; set; }
    [ForeignKey(nameof(User))] public required User UserId { get; set; }
    
}