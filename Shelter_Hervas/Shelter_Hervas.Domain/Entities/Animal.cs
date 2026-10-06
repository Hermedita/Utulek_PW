using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

//TODO: Db Animal
//•	Animal_ID: int (PK)
//•	Name: string
//•	Age: double
//•	Gender: string
//•	Species_ID: int (FK)
//•	Adoptable: bool

namespace Shelter_Hervas.Domain.Entities
{
    [Table(nameof(Animal))]
    public class Animal : Entity<int>
    {
        public string? Name { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        [ForeignKey(nameof(Species))] public required Species SpeciesId { get; set; }
        public required bool Adoptable{ get; set; }
    }
}