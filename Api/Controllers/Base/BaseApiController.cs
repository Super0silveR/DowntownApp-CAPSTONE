#nullable disable

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Core;
using Api.Extensions;

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

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();


        /// <summary>
        /// Centralized function for handling the results of each MediatR call.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="result"></param>
        /// <returns></returns>
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null) return NotFound();
            if (result.IsSuccess && result.Value is not null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value is null)
                return NotFound();
            return BadRequest(result.Error);
        }

        /// <summary>
        /// Same as 'HandleResult<T>' with the expection of managing pagination headers.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="result"></param>
        /// <returns></returns>
        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result is null) return NotFound();

            /// If the request is 'OK' and everything went as expected.
            if (result.IsSuccess && result.Value is not null)
            {
                /// Adding the headers for to the response.
                Response.AddPaginationHeader(result.Value.CurrentPage, 
                    result.Value.PageSize, result.Value.TotalCount, result.Value.TotalPages);

                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value is null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}
