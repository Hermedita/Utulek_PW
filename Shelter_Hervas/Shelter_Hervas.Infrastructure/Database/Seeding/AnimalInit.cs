using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class AnimalInit
    {
        public IList<Animal> GetAnimal1()
        {
            IList<Animal> animals = new List<Animal>();

            animals.Add(new Animal
            {
                Id = 1,
                Name = "Maruška",
                Age = 4,
                Gender = GenderEnum.Samice,
                SpeciesId = 1,
                BreedId = 1,
                Adoptable = true
            });
            
            return animals;
        }
    }
}
// Id: int (PK)
// Name: string
// Age: int
// Gender: enum (GenderEnum)
// SpeciesId: int (FK) (M)
// BreedId: int (FK)
// Adoptable: bool (M)
