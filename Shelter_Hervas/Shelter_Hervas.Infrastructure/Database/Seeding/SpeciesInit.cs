using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class SpeciesInit
    {
        public IList<Species> Getspecies1()
        {

            //•	Species_ID: int (PK)
            //•	Type: string

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