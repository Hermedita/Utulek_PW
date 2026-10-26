using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class AdoptionInit
    {
        public IList<Adoption> GetAdoption1()
        {
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
            // Id: int (PK)
            // AdoptionRequestId: int (FK) (M)
