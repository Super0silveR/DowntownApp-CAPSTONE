using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Handlers.EventCategories.Queries;
using Application.Handlers.EventCategories.Commands;
using Application.DTOs;
using Application.DTOs.Commands;

namespace Api.Controllers.Lookup
{
    [Authorize]
    [Route("api/[controller]")]
    public class EventCategoriesController : BaseApiController
    {
        public EventCategoriesController() { }

        #region Queries

        [HttpGet] //api/eventcategories
        public async Task<IActionResult> GetEventCategories()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/eventcategories/{id}
        public async Task<IActionResult> GetEventCategoryDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        #endregion

        #region Commands

        [HttpPost] //api/eventcategories
        public async Task<IActionResult> CreateEventCategory(EventCategoryCommandDto categoryDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { EventCategory = categoryDto }));
        }

        [HttpPut("{id}")] //api/eventcategories/{id}
        public async Task<IActionResult> UpdateEventCategory(Guid id, EventCategoryCommandDto categoryDto)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, EventCategory = categoryDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        #endregion
    }
}
