using Application.Core;

namespace Application.Params
{
    /// <summary>
    /// Class containing a certain set of filtering parameters for our Event Listing.
    /// Inherits from PaginationParams so we can use pagination as well.
    /// </summary>
    public class EventParams : PaginationParams
    {
        public bool IsGoing { get; set; }
        public bool IsHosting { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public int DistanceFrom { get; set; } = -1;
    }
}
