using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the possible 'creator content genre' available.
    /// Made into a table instead of ENUM to allow user to create custom ones.
    /// </summary>
    public class ContentGenres
    {
       [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
       public int Id { get; set; }
       public string? Value { get; set; }

       public virtual ICollection<CreatorContentGenres> GenredCreators { get; set; } = new HashSet<CreatorContentGenres>();
    }
}
