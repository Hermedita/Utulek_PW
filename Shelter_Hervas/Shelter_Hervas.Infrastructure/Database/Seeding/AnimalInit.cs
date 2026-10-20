using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class AnimalInit
    {
        public IList<Animal> GetAnimal1()
        {
            //•	Animal_ID: int (PK)
            //•	Name: string
            //•	Age: double
            //•	Gender: string
            //•	Species_ID: int (FK)
            //• Breed_ID: int (FK)
            //•	Adoptable: bool
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