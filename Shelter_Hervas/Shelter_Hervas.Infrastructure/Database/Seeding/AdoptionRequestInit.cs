using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class AdoptionRequestInit
    {
        public IList<AdoptionRequest> GetAdoptionRequest1()
        {
            //•	AdoptRequest_ID: int (PK)
            //•	Status: RequestStatus
            //•	Animal_ID: int (FK)
            //•	User_ID: int (FK)
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