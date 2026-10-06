using Shelter_Hervas.Domain.Entities.Interfaces;

namespace Shelter_Hervas.Domain.Entities
{
    public class Entity<TKey> : IEntity<TKey> where TKey : notnull
    {
        public TKey Id { get; set; }
    }
}
