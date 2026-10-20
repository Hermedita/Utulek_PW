using System.ComponentModel.DataAnnotations.Schema;
using Shelter_Hervas.Domain.Entities.enums;
using System.ComponentModel.DataAnnotations;

namespace Shelter_Hervas.Domain.Entities
{
    [Table(nameof(Animal))]
    public class Animal : Entity<int>
    {
        [MaxLength(100)]
        public string? Name { get; set; }
        
        [Range(0,150)]
        public int? Age { get; set; }
        
        public GenderEnum? Gender { get; set; }
        
        public int SpeciesId { get; set; }
        public Species Species { get; set; } = null!;
        
        public int? BreedId { get; set; }
        public Breed? Breed { get; set; }
        
        public required bool Adoptable{ get; set; }
        
        public ICollection<AnimalListing> AnimalListings { get; set; } = new List<AnimalListing>();
        public ICollection<AdoptionRequest> AdoptionRequests { get; set; } = new List<AdoptionRequest>();
    }
}