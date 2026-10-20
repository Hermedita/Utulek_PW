using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class BreedInit
    {
        public IList<Breed> GetBreed1()
        {
            //•	Breed_ID: int (PK)
            //•	BreedName: string

            IList<Breed> breeds = new List<Breed>();

            breeds.Add(new Breed
            {
                Id = 1,
                BreedName = "Něvská maškaráda",
                SpeciesId = 1
            });
            
            return breeds;
        }
    }

}