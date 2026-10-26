using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class PaymentInit
    {
        public IList<Payment> GetPayment1()
        {
            IList<Payment> payments = new List<Payment>();

            payments.Add(new Payment
            {
                Id = 1,
                PayMethod = "Card",
                PayDate = new DateTime(2026, 1, 1, 3, 15,45),
                Price = 456.90m,
                PaymentStatus = PaymentStatus.Success,
                Refund = false
            });
            return payments;
        }
    }
}
    // Id: int (PK)
    // PayMethod: string (30)
    // PayDate: date (M)
    // Price: decimal (M)
    // PaymentStatus: enum (M)
    // Refund: bool (M)


