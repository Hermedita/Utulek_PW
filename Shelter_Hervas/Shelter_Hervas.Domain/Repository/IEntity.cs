namespace Shelter_Hervas.Domain.Repository;

public interface IEntity<TKey> where TKey : notnull
{
    Tkey Id { get; set; }
    
}