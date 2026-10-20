using Shelter_Hervas.Domain.Repository;

namespace Shelter_Hervas.Domain.Entities
{
    public abstract class Entity<TKey> : IEntity<TKey> where TKey : notnull
    {
        public TKey Id { get; set; } = default!;
    }
}
