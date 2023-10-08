using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    /// <summary>
    /// PagedList class is used for paginating any kind of list we want to return in our Application.
    /// Main use-case here is our events/scheduled events.
    /// </summary>
    /// <typeparam name="T">Entity targeted for the pagination.</typeparam>
    public class PagedList<T> : List<T>
    {
        /// ctor.
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;

            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        /// <summary>
        /// Main method used for initializing/creating a new paged list, based on the pageNumber and pageSize.
        /// </summary>
        /// <param name="source">Queryable object that we want to use.</param>
        /// <param name="pageNumber">What page number the user is currently looking at.</param>
        /// <param name="pageSize">What page size, or the amount of information the user want to see in the list.</param>
        /// <returns></returns>
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            /// Execution of the first query to the Db to know the total count of the current list.
            var count = await source.CountAsync();

            /// Execution of the second query, more definite in terms of what to take, and where, within the list.
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            /// Return the new paginated list of results.
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
