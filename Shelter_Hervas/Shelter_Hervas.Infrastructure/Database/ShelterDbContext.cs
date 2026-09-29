using Microsoft.EntityFrameworkCore;

namespace Shelter_Hervas.Infrastructure.Database;

public class ShelterDbContext : DbContext
{
    //TODO: pridat tabulky --> viz. DbSet
    //public DbSet<Animal> Animals { get; set; }
    
    
    public ShelterDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        //pridani seedingu
        //var AnimalInit = new AnimalInit();
        //modelBuilder.Entity<Animal>().HasData(AnimalInit.GetAnimal3());
    }
}