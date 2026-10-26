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
            Image = "Shelter_Hervas/wwwroot/img/kocka/01.jpg",
            AnimalId = 1,
            LocationId = 2
        });
        return animalListings;

    }
}

// Id: int (PK)
// ListingStatus: enum (M)
// Description: string (500)
// Image: string (200)
// AnimalId: int (FK) (M)
// LocationId: int (FK)
