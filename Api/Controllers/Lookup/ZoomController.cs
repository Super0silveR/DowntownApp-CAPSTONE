using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZoomController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ZoomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var apiKey = _configuration["Zoom:ApiKey"];
            var apiSecret = _configuration["Zoom:ApiSecret"];
            var meetingNumber = _configuration["Zoom:MeetingNumber"];
            var displayName = _configuration["Zoom:DisplayName"];

            return Ok(new
            {
                ApiKey = apiKey,
                ApiSecret = apiSecret,
                MeetingNumber = meetingNumber,
                DisplayName = displayName
            });
        }
    }
}
