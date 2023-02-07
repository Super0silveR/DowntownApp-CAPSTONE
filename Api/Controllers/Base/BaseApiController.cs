#nullable disable

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Core;

namespace Api.Controllers.Base
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            return BadRequest(result.Error);
        }
    }
}
