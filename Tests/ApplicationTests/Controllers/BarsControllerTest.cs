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

namespace Api.Tests.Controllers
{
    public class BarsControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly BarsController _controller;

        public BarsControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new BarsController(_mediatorMock.Object)
            {
                ControllerContext = new ControllerContext()
            };
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;

        }

        [Fact]
        public async Task ShouldGetBars()
        {
            // Arrange
            var mockResult = new Result<List<BarDto>>() { Value = new List<BarDto>() };
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            // Act
            var result = await _controller.GetBars();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Result<List<BarDto>>>(okResult.Value);
            Assert.Equal(mockResult.Value, returnValue.Value);
        }


        [Fact]
        public async Task ShouldGetBarDetails()
        {
            // Arrange
            var barId = Guid.NewGuid();

            var mockDetailsResult = new Result<BarDto?>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            // Act
            var result = await _controller.GetBarDetails(barId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Result<BarDto>>(okResult.Value);
            Assert.Equal(mockDetailsResult.Value, returnValue.Value);
        }

    }
}
