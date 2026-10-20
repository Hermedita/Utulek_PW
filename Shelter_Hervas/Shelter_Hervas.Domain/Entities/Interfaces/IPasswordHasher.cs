namespace Shelter_Hervas.Domain.Entities.Interfaces;

public interface IPasswordHasher
{
    (string Hash, string Salt) Hash(string password);
    bool Verify(string password, string hash, string salt);
}
/* into infrastructure
using System.Security.Cryptography;

public class Pbkdf2PasswordHasher : IPasswordHasher
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 100_000;

    public (string Hash, string Salt) Hash(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
            password, salt, Iterations, HashAlgorithmName.SHA256, HashSize);

        return (Convert.ToBase64String(hash), Convert.ToBase64String(salt));
    }

    public bool Verify(string password, string hash, string salt)
    {
        byte[] saltBytes = Convert.FromBase64String(salt);
        byte[] expected = Convert.FromBase64String(hash);
        byte[] actual = Rfc2898DeriveBytes.Pbkdf2(
            password, saltBytes, Iterations, HashAlgorithmName.SHA256, HashSize);

        return CryptographicOperations.FixedTimeEquals(actual, expected);
    }
}
*/
/* in service
public class UserService
{
    private readonly IUnitOfWork _uow;
    private readonly IPasswordHasher _hasher;

    public UserService(IUnitOfWork uow, IPasswordHasher hasher)
    {
        _uow = uow;
        _hasher = hasher;
    }

    public async Task RegisterAsync(string loginName, string email, string password)
    {
        var (hash, salt) = _hasher.Hash(password);

        var user = new User
        {
            LoginName = loginName,
            Email = email,
            PasswordHash = hash,
            PasswordSalt = salt,
            Role = RoleEnum.User
        };

        await _uow.Repository<User, int>().AddAsync(user);
        await _uow.SaveChangesAsync();
    }
}
*/
// in DI
// services.AddScoped<IPasswordHasher, Pbkdf2PasswordHasher>();