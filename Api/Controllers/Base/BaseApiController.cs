#nullable disable

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Core;

namespace Api.Controllers.Base
{
    /// <summary>
    /// Api Base Class.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();

        // Centralized function for handling the results of each MediatR call.
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null) return NotFound();
            if (result.IsSuccess && result.Value is not null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value is null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}
