using Shelter_Hervas.Domain.Entities;

namespace Shelter_Hervas.Infrastructure.Database.Seeding;

internal class DonationsInit
{
    //•	User_ID: int (FK)
    //•	Payment_ID: int (FK)        
    public IList<Donation> GetDonation1()
    {
        IList<Donation> donations = new List<Donation>();

        donations.Add(new Donation
        {
            Id = 1,
            UserId = 1,
            PaymentId = 1
        });
        
        return donations;
    }
}
// Id: int (PK)
// UserId: int (FK) (M)
// PaymentId: int (FK) (M)
