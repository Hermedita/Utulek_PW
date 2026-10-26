using Microsoft.EntityFrameworkCore;
using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Infrastructure.Database.Configuration.ConfigureConventions;
using Shelter_Hervas.Infrastructure.Database.Seeding;

namespace Shelter_Hervas.Infrastructure.Database;

public class ShelterDbContext : DbContext
{
    //Adoption          AdoptionRequest
    //Animal            Breed           Species
    //Donation          Payment
    //User              
    //AnimalListing     Location
    
    //Adoption
    public DbSet<Adoption>Adoptions{get;set;}
    public DbSet<AdoptionRequest>AdoptionRequests{get;set;}

    //Animal
    public DbSet<Animal>Animals{get;set;}
    public DbSet<Breed>Breeds{get;set;}
    public DbSet<Species> Species{get;set;}

    //Pay
    public DbSet<Donation> Donations{get;set;}
    public DbSet<Payment> Payments{get;set;}

    //User
    public DbSet<User> Users{get;set;}

    //Listing
    public DbSet<AnimalListing>AnimalListings{get;set;}
    public DbSet<Location> Locations{get;set;}
    
    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        builder.EnumConventions();
    }
 
    public ShelterDbContext(DbContextOptions<ShelterDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {        
        base.OnModelCreating(modelBuilder);
        
        //load config entities
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShelterDbContext).Assembly);
        
        // HasData -- Seeding
        AdoptionInit adoptionInit = new AdoptionInit();
        modelBuilder.Entity<Adoption>().HasData(adoptionInit.GetAdoption1());
        
        AdoptionRequestInit adoptionRequestInit = new AdoptionRequestInit();
        modelBuilder.Entity<AdoptionRequest>().HasData(adoptionRequestInit.GetAdoptionRequest1());
        
        AnimalInit animalInit = new AnimalInit();
        modelBuilder.Entity<Animal>().HasData(animalInit.GetAnimal1());
        
        BreedInit breedInit = new BreedInit();
        modelBuilder.Entity<Breed>().HasData(breedInit.GetBreed1());
        
        SpeciesInit speciesInit = new SpeciesInit();
        modelBuilder.Entity<Species>().HasData(speciesInit.Getspecies1());
        
        DonationsInit donationsInit = new DonationsInit();
        modelBuilder.Entity<Donation>().HasData(donationsInit.GetDonation1());
        
        PaymentInit paymentInit = new PaymentInit();
        modelBuilder.Entity<Payment>().HasData(paymentInit.GetPayment1());
        
        UserInit userInit = new UserInit();
        modelBuilder.Entity<User>().HasData(userInit.GetUser_MainThree1());
        
        AnimalListingInit animalListingInit = new AnimalListingInit();
        modelBuilder.Entity<AnimalListing>().HasData(animalListingInit.GetAnimalListing1());
        
        LocationInit locationInit = new LocationInit();
        modelBuilder.Entity<Location>().HasData(locationInit.GetLocation1());
    }
}