using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the collection of likes and dislikes for a bar.
    /// </summary>
    public class BarLike : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid BarId { get; set; }
        public bool Vote { get; set; }

        public virtual User? User { get; set; }
        public virtual Bar? Bar { get; set; }
    }
}
