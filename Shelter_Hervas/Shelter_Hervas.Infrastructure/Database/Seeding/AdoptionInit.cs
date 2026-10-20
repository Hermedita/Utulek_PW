using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class AdoptionInit
    {
        public IList<Adoption> GetAdoption1()
        {
            //•	Adoption_ID: int (PK)
            //•	AdoptRequest_ID: int (FK)
            IList<Adoption> adoptions = new List<Adoption>();

            adoptions.Add(new Adoption
            {
                Id = 1,
                AdoptionRequestId = 1
            });
            
            return adoptions;
        }
    }

}
