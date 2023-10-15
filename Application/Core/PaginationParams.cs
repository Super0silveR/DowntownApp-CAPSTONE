using System.Diagnostics.CodeAnalysis;

namespace Application.Core
{
    /// <summary>
    /// Parameters class for the pagination functionnality.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class PaginationParams
    {
        /// <summary>
        /// Constant max page size the user can't go over.
        /// </summary>
        private const int MAX_PAGE_SIZE = 50;

        /// <summary>
        /// PageNumber of the currently viewed page.
        /// </summary>
        public int PageNumber { get; set; } = 1;

        /// <summary>
        /// PageSize of the currently viewed page.
        /// </summary>
        private int _pageSize = 10;   
        
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MAX_PAGE_SIZE) ? MAX_PAGE_SIZE : value;
        }

    }
}
