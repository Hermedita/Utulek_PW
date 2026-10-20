using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Shelter_Hervas.Domain.Entities.enums;

namespace Shelter_Hervas.Domain.Entities;

[Table(nameof(AnimalListing))]
public class AnimalListing : Entity<int>
{
    public required ListingStatus ListingStatus {get; set;}
    
    [MaxLength(500)]
    public string? Description {get; set;}
    
    [MaxLength(200)]
    public string? Image {get;set;}

    public int AnimalId { get; set; }
    public Animal Animal { get; set; } = null!;

    public int? LocationId { get; set; }
    public Location? Location { get; set; }
}