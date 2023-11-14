using Api.Controllers.Lookup;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Application.Handlers.EventCategories.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading;
using Xunit;

namespace Api.Tests.Controllers
{
    public class EventCategoriesControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly EventCategoriesController _controller;

        public EventCategoriesControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new EventCategoriesController
            {
                ControllerContext = new ControllerContext()
            };
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;
        }

        [Fact]
        public async Task ShouldGetEventCategories()
        {
            var mockResult = new Result<List<EventCategoryDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetEventCategories();

            var okResult = result as OkObjectResult;

            
        }

        [Fact]
        public async Task ShouldGetEventCategoryDetails()
        {
            var eventCategoryId = Guid.NewGuid();

            var mockDetailsResult = new Result<EventCategoryDto?>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetEventCategoryDetails(eventCategoryId);

            var okResult = result as OkObjectResult;

        }
    }
}
