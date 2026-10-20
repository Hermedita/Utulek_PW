using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Infrastructure.Database.Seeding;

internal class UserInit
{
    //•	User_ID: int (PK)
    //•	LoginName: string (U)
    //•	Email: string (U)
    //•	PasswordHash: string
    //•	PasswordSalt: string
    //•	Role_ID: int (FK)
    public IList<User> GetUser_MainThree1()
    {
        IList<User> users = new List<User>();

        users.Add(new User
        {
            Id = 1,
            LoginName = "Admin",
            Email = "admin@hervas.cz",
            PasswordHash = "admin",
            PasswordSalt = "admin",
            Role = RoleEnum.Admin
        });
        
        users.Add(new User
        {
            Id = 2,
            LoginName = "Manažer",
            Email = "manager@hervas.cz",
            PasswordHash = "manager",
            PasswordSalt = "manager",
            Role = RoleEnum.Manager
        });
        
        users.Add(new User
        {
            Id = 3,
            LoginName = "Jan Novák",
            Email = "jan@example.com",
            PasswordHash = "jan",
            PasswordSalt = "jan",
            Role = RoleEnum.User
        });
        
        return users;
    }
    
}