using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Shelter_Hervas.Domain.Entities;
using Shelter_Hervas.Infrastructure.Database.Seeding;

namespace Shelter_Hervas.Infrastructure.Database;

public class ShelterDbContext : DbContext
{
    //Adoption
    public DbSet<Adoption>Adoptions{get;set;}
    public DbSet<AdoptionRequest>AdoptionRequests{get;set;}

    //Animal
    public DbSet<Animal>Animals{get;set;}
    public DbSet<Breed>Breeds{get;set;}
    public DbSet<Species> Species{get;set;}

    //Money
    public DbSet<Donation> Donations{get;set;}
    public DbSet<Payment> Payments{get;set;}

    //User
    public DbSet<User> Users{get;set;}

    //Listing
    public DbSet<AnimalListing>AnimalListings{get;set;} //interface
    public DbSet<Location> Locations{get;set;}
    
    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        builder.Properties<Enum>()
            .HaveConversion<string>()
            .HaveMaxLength(20);
    }
 
    public ShelterDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {        
        base.OnModelCreating(modelBuilder);
        //Adoption          AdoptionRequest
        //Animal            Breed           Species
        //Donation          Payment
        //User              
        //AnimalListing     Location

        //Adoption
        modelBuilder.Entity<Adoption>(entity =>
        {
            entity.HasOne(ad => ad.AdoptionRequest)
                .WithOne(ar => ar.Adoption)
                .HasForeignKey<Adoption>(ad => ad.AdoptionRequestId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();  // is required
        });
        
        modelBuilder.Entity<AdoptionRequest>(entity =>
        {
            entity.Property(ar => ar.RequestStatus)
                .IsRequired();  // is required
            
            entity.HasOne(a => a.Animal)
                .WithMany(ar => ar.AdoptionRequests)
                .HasForeignKey(ar => ar.AnimalId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();  // is required

            entity.HasOne(u => u.User)
                .WithMany(a => a.AdoptionRequests)
                .HasForeignKey(ar => ar.UserId)
                .OnDelete(DeleteBehavior.Restrict)  //kaskady
                .IsRequired();  // is required
        });
        
        //Animal
        modelBuilder.Entity<Animal>(entity =>
        {
            entity.Property(an => an.Gender)
                .IsRequired(false); // is optional
            
            entity.HasOne(an => an.Species)
                .WithMany(s => s.Animals)
                .HasForeignKey(an => an.SpeciesId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();  // is required

            entity.HasOne(an => an.Breed)
                .WithMany(b => b.Animals)
                .HasForeignKey(an => an.BreedId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false); // is optional

            entity.Property(an => an.Adoptable)
                .IsRequired();  // is required
        });

        modelBuilder.Entity<Breed>(entity =>
        {
            entity.Property(b => b.BreedName)
                .IsRequired() // is required
                .HasMaxLength(100);
            
            entity.HasIndex(b => new { b.SpeciesId, b.BreedName })
                .IsUnique();
            
            entity.HasOne(b => b.Species)
                .WithMany(s => s.Breeds)
                .HasForeignKey(b => b.SpeciesId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        });

        modelBuilder.Entity<Species>(entity =>
        {
            entity.Property(s => s.SpeciesName)
                .IsRequired()
                .HasMaxLength(100);
            entity.HasIndex(s => s.SpeciesName)
                .IsUnique();
        });

        //Donation
        modelBuilder.Entity<Donation>(entity =>
        {
            entity.HasOne(d => d.User)
                .WithMany(u => u.Donations)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            entity.HasOne(d => d.Payment)
                .WithOne(p => p.Donation)
                .HasForeignKey<Donation>(d => d.PaymentId)   //one to one
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.Property(p => p.PayMethod)
                .HasMaxLength(30)
                .IsRequired();

            entity.Property(p => p.PayDate)
                .IsRequired();

            entity.Property(p => p.Price)
                .HasPrecision(18, 2)
                .IsRequired();

            entity.Property(p => p.PaymentStatus)
                .IsRequired();

            entity.Property(p => p.Refund)
                .HasDefaultValue(false);
        });

        //User
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.Role)
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(u => u.LoginName)
                .IsRequired()
                .HasMaxLength(50);
            entity.HasIndex(u => u.LoginName)
                .IsUnique();
            
            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(254);
            entity.HasIndex(u => u.Email)
                .IsUnique();

            entity.Property(u => u.PasswordHash)
                .HasMaxLength(200);         
            
            entity.Property(u => u.PasswordSalt)
                .HasMaxLength(100);
        });
        
        //AnimalListing
        modelBuilder.Entity<AnimalListing>(entity =>
        {
            entity.Property(al => al.ListingStatus)
                .HasConversion<string>()
                .IsRequired();

            entity.HasOne(al => al.Animal)
                .WithMany(a => a.AnimalListings)
                .HasForeignKey(al => al.AnimalId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();  // AnimalId is required

            entity.HasOne(al => al.Location)
                .WithMany(l => l.AnimalListings)
                .HasForeignKey(al => al.LocationId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false); // LocationId is optional
        });
        
        //Location
        modelBuilder.Entity<Location>(entity =>
        {
            entity.Property(l => l.Place)
                .IsRequired()
                .HasMaxLength(200);
            entity.HasIndex(l => l.Place)
                .IsUnique();
        });
        

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