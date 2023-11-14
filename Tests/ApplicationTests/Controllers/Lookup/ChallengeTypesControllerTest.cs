using Api.Controllers.Lookup;
using Application.Core;
using Application.DTOs.Queries;
using Application.Handlers.ChallengeTypes.Queries;
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
    public class ChallengeTypesControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly ChallengeTypesController _controller;

        public ChallengeTypesControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new ChallengeTypesController
            {
                ControllerContext = new ControllerContext()
            };
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;

        }

        [Fact]
        public async Task ShouldGetChallengeTypes()
        {
            var mockResult = new Result<List<ChallengeTypeDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetChallengeTypes();

            var okResult = result as OkObjectResult;
        }

        [Fact]
        public async Task ShouldGetChallengeTypeDetails()
        {
            var challengeTypeId = Guid.NewGuid();

            var mockDetailsResult = new Result<ChallengeTypeDto?>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetChallengeTypesDetails(challengeTypeId);

            var okResult = result as OkObjectResult;
        }
    }
}
