using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Handlers.MeetingZoomTypes.Queries;
using Application.Handlers.MeetingZoomTypes.Commands;
using Application.DTOs;
using Application.DTOs.Commands;

namespace Api.Controllers.Lookup
{
    [Authorize(Policies.CREATOR)]
    [Route("api/[controller]")]
    public class oomTypesController : BaseApiController
    {
        public MeetingZoomTypesController() { }

        #region Queries

        [HttpGet] //api/MeetingZoomtypes
        public async Task<IActionResult> GetMeetingZoomTypes()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/MeetingZoomtypes/{id}
        public async Task<IActionResult> GetMeetingZoomTypeDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        #endregion

        #region Commands

        [HttpPost] //api/MeetingZoomtypes
        public async Task<IActionResult> CreateMeetingZoomType(MeetingZoomTypeCommandDto MeetingZoomDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { MeetingZoomType = MeetingZoomDto }));
        }

        [HttpPut("{id}")] //api/MeetingZoomtypes/{id}
        public async Task<IActionResult> UpdateMeetingZoomType(Guid id, MeetingZoomTypeCommandDto MeetingZoomDto)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, MeetingZoomType = MeetingZoomDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeetingZoomType(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        #endregion
    }
}