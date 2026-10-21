namespace Shelter_Hervas.Domain.Repository;

public interface IEntity<TKey> where TKey : notnull
{
    TKey Id { get; set; }
}