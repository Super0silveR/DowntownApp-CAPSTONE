using System.Text.Json;

namespace Api.Extensions
{
    /// <summary>
    /// Static class used for adding/managing HTTP extensions to our request/response if needed.
    /// </summary>
    public static class HttpExtensions
    {
        /// <summary>
        /// Static method used for adding the pagination header to the response.
        /// </summary>
        /// <param name="response">Response needing a pagination header.</param>
        /// <param name="currentPage">Current viewed page.</param>
        /// <param name="itemsPerPage">Number of items returned, per page.</param>
        /// <param name="totalItems">Total number of items.</param>
        /// <param name="totalPages">Total number of pages.</param>
        public static void AddPaginationHeader(this HttpResponse response, 
            int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            string paginationTitle = "Pagination";

            /// Anonymous object to be serialized when added to headers.
            var paginationHeader = new
            {
                currentPage,
                itemsPerPage,
                totalItems,
                totalPages
            };

            response.Headers.Add(paginationTitle, JsonSerializer.Serialize(paginationHeader));

            /// Exposing the headers so we can access/read them on the client side.
            response.Headers.Add("Access-Control-Expose-Headers", paginationTitle);
        }
    }
}
