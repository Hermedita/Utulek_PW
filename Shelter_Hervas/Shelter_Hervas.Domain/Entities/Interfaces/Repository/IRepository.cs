using System.Linq.Expressions;

namespace Shelter_Hervas.Domain.Repository;

public interface IRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>
    where TKey : IEquatable<TKey>
{
    Task<TEntity?> GetByIdAsync(TKey id, CancellationToken ct = default);
    Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken ct = default);
    Task<IReadOnlyList<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken ct = default);
    Task AddAsync(TEntity entity, CancellationToken ct = default);
    void Update(TEntity entity);
    void Remove(TEntity entity);
    
}
/*
using System.Linq.Expressions;

namespace UTB.Eshop.Domain.Entities.Interfaces.Repository
{
    TODO:public interface IRepository<T, TKey> where T : IEntity<TKey> where TKey : notnull
    {
        T? GetById(TKey id);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Edit(T entity);
        void Delete(T entity);
    }
}
 */