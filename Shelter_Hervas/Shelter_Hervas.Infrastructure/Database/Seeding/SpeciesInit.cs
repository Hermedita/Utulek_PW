using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class SpeciesInit
    {
        public IList<Species> Getspecies1()
        {
            IList<Species> species = new List<Species>();

            species.Add(new Species
            {
                Id = 1,
                SpeciesName = "Kočka",
            });
            
            return species;
        }
    }
}
// Id: int (PK)
// SpeciesName: string (M)
