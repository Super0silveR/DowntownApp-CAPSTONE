using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Standard Fallback controller when hosting static files as client application.
    /// </summary>
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        /// <summary>
        /// Only endpoints allowing us to redirect to static files containing our Application.
        /// </summary>
        /// <returns>Physical Index.html files that is in wwwroot.</returns>
        public IActionResult Index()
        {
            return PhysicalFile(
                Path.Combine(
                    Directory.GetCurrentDirectory(), 
                    "wwwroot", 
                    "index.html"), 
                "text/HTML");
        }
    }
}
