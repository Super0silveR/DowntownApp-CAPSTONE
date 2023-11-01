using Api.Controllers;
using Application.Handlers.Followers.Commands;
using Application.Handlers.Followers.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using System.Collections.Generic; 
using Application.DTOs.Queries;

namespace Api.Tests.Controllers
{
    public class FollowersControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly FollowersController _controller;

        public FollowersControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new FollowersController();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    RequestServices = serviceProviderMock.Object
                }
            };
        }

        [Fact]
        public async Task ShouldFollow()
        {
            var mockResult = new Application.Core.Result<MediatR.Unit>(); 

            _mediatorMock.Setup(m => m.Send(It.IsAny<FollowToggle.Command>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mockResult));  

            var result = await _controller.Follow("sampleUsername");

        }


        [Fact]
        public async Task ShouldGetFollowings()
        {
            var mockResult = new Application.Core.Result<List<ProfileLightDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mockResult));  

            var result = await _controller.GetFollowings("sampleUsername", "predicateSample");

        }
    }
}
