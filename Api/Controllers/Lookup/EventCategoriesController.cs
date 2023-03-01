using Api.Controllers.Base;
using Policies = Api.Constants.AuthorizationPolicyConstants;
using Microsoft.AspNetCore.Mvc;
using Application.Core;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using Application.DTOs;
using Application.Handlers.EventCategories.Queries;

namespace Api.Controllers.Lookup
{
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
        public async Task<IActionResult> GetEventCategory(Guid Id)
        {
            return HandleResult(new Result<EventCategory>());
        }

        #endregion

        #region Commands

        [Authorize(Policies.ADMIN)]
        [HttpPost]
        public async Task<IActionResult> CreateEventCategories(EventCategoryDto eventCategory)
        {
            return HandleResult(new Result<Unit>());
        }

        #endregion
    }
}
