using System;
using System.Threading.Tasks;
using Api.Controllers.Lookup;
using Application.DTOs;
using Application.Handlers.Bars.Commands;
using Application.Handlers.Bars.Queries;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace ApplicationTests.Controllers
public class BarsControllerTest
{
    private readonly BarsController _controller;
    private readonly Mock<IMediator> _mediatorMock;

    public BarsControllerTests()
    {
        var mapper = new Mock<IMapper>();
        _mediatorMock = new Mock<IMediator>();
        _controller = new BarsController(mapper.Object, _mediatorMock.Object);
    }

    [Fact]
    public async Task GetBars_ReturnsOkObjectResult()
    {
        // Arrange
        var query = new List.Query();
        var bars = new List<BarDto> {  };
        _mediatorMock
            .Setup(mediator => mediator.Send(query, default))
            .ReturnsAsync(bars);

        // Act
        var result = await _controller.GetBars();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var model = Assert.IsType<List<BarDto>>(okResult.Value);
        Assert.Equal(bars, model);
    }

    [Fact]
    public async Task GetBarDetails_ReturnsOkObjectResult()
    {
        // Arrange
        var barId = Guid.NewGuid();
        var query = new Details.Query { Id = barId };
        var barDto = new BarDto  };
        _mediatorMock
            .Setup(mediator => mediator.Send(query, default))
            .ReturnsAsync(barDto);

        // Act
        var result = await _controller.GetBarDetails(barId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var model = Assert.IsType<BarDto>(okResult.Value);
        Assert.Equal(barDto, model);
    }

}
