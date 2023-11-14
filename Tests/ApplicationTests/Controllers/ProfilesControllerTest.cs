using Api.Controllers;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Application.Handlers.Profiles.Commands;
using Application.Handlers.Profiles.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Api.Tests.Controllers
{
    public class ProfilesControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly ProfilesController _controller;

        public ProfilesControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new ProfilesController();

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
        public async Task ShouldGetProfile()
        {
            var mockResult = new Application.Core.Result<ProfileDto>();  
            _mediatorMock.Setup(m => m.Send(It.IsAny<ProfileDetails.Query>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mockResult)!);  

            var result = await _controller.GetProfile("sampleUsername");

        }


        [Fact]
        public async Task ShouldEditProfile()
        {
            var mockResult = new Application.Core.Result<MediatR.Unit>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<GeneralEdit.Command>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var profile = new ProfileCommandDto();
            var result = await _controller.EditProfile(profile);

        }
    }
}
