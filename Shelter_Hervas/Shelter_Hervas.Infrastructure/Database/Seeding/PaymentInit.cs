using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding
{
    internal class PaymentInit
    {
        public IList<Payment> GetPayment1()
        {
            //•	Payment_ID: int (PK)
            //•	PayMethod: string
            //•	Date: date
            //•	Price: double
            //•	Process: PaymentStatus
            //•	Refund: bool

            IList<Payment> payments = new List<Payment>();

            payments.Add(new Payment
            {
                Id = 1,
                PayDate = new DateTime(2026, 1, 1, 3, 15,45),
                PayMethod = "Card",
                Price = 456.90m,
                PaymentStatus = PaymentStatus.Success,
                Refund = false
            });
            return payments;
        }

    }
}

