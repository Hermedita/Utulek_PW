using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding;

internal class AnimalListingInit
{
    //•	AniListing_ID: int (PK)
    //•	Status: ListingStatus
    //•	Description: string
    //•	Animal_ID: int (FK)
    //•	Location_ID: int (FK)
    public IList<AnimalListing> GetAnimalListing1()
    {
        IList<AnimalListing> animalListings = new List<AnimalListing>();
        
        animalListings.Add(new AnimalListing
        {
            Id = 1,
            ListingStatus = ListingStatus.Active,
            Description = "Velká kočka",
            Image = "/img/kocka/kocka_2.png",
            AnimalId = 1,
            LocationId = 2
        });
        return animalListings;

    }
}