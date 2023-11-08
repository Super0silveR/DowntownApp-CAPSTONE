using Api.Controllers.Lookup;
using Application.Core;
using Application.DTOs.Queries;
using Application.Handlers.Bars.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading;
using Xunit;

namespace ControllersTests
{
    public class BarsControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly BarsController _controller;

        public BarsControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new BarsController(_mediatorMock.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;

        }

        [Fact]
        public async Task ShouldGetBars()
        {
            var mockResult = new Result<List<BarDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetBars();

            var okResult = result as OkObjectResult;
        }

        [Fact]
        public async Task ShouldGetBarDetails()
        {
            var barId = Guid.NewGuid();

            var mockDetailsResult = new Result<BarDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetBarDetails(barId);

            var okResult = result as OkObjectResult;
        }
    }
}
