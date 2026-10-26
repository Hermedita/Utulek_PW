using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class AdoptionRequestInit
    {
        public IList<AdoptionRequest> GetAdoptionRequest1()
        {
            IList<AdoptionRequest> adoptionRequests = new List<AdoptionRequest>();

            adoptionRequests.Add(new AdoptionRequest
            {
                Id = 1,
                RequestStatus = RequestStatus.Processing,
                AnimalId = 1,
                UserId = 1
            });
            
            return adoptionRequests;
        }
    }
}
// Id: int (PK)
// RequestStatus: enum (M)
// AnimalId: int (FK) (M)
// UserId: int (FK) (M)
