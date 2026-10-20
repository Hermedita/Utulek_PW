using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding;

internal class LocationInit
{
    //•	Location_ID: int (PK)
    //•	Place: string
    public IList<Location> GetLocation1()
    {
        IList<Location> locations = new List<Location>();
        
        locations.Add(new Location
        {
            Id = 1,
            Place = "Záchranný areál HERVAS"
        });
        return locations;
        
    }
    
}