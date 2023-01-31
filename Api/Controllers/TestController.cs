using Api.Controllers.Base;
using Application.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTest()
        {
            var response = await Mediator.Send(new TestInfoQuery { TestId = "123" });
            return Ok(response);
        }
    }
}
