using Api.Controllers.Base;
using Application.Handlers.Photos.Commands;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost] /// api/Photos
        public async Task<IActionResult> Upload([FromForm] AddPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost("{id}/setMain")] /// api/Photos/{id}/setMain
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { Id = id }));
        }

        [HttpDelete("{id}")] /// api/Photos
        public async Task<IActionResult> Remove(string id)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }));
        }
    }
}
