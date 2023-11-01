using Api.Controllers;
using Application.Handlers.Photos.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Api.Tests.Controllers
{
    public class PhotosControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly PhotosController _controller;

        public PhotosControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new PhotosController();

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
        public async Task ShouldUploadPhoto()
        {
            var mockPhoto = new Domain.Entities.UserPhoto(); 
            var mockResult = new Application.Core.Result<Domain.Entities.UserPhoto> { Value = mockPhoto };

            _mediatorMock.Setup(m => m.Send(It.IsAny<AddPhoto.Command>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mockResult));

            var result = await _controller.Upload(new AddPhoto.Command());

        }


        [Fact]
        public async Task ShouldSetMainPhoto()
        {
            var mockResult = new Application.Core.Result<MediatR.Unit>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<SetMainPhoto.Command>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mockResult));

            var result = await _controller.SetMain("sampleId");

        }

        [Fact]
        public async Task ShouldRemovePhoto()
        {
            var mockResult = new Application.Core.Result<MediatR.Unit>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<DeletePhoto.Command>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mockResult));

            var result = await _controller.Remove("sampleId");

        }
    }
}
