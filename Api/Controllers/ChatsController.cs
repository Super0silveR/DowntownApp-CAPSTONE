using Api.Controllers.Base;
using Application.DTOs.Commands;
using Application.Handlers.Chats.Commands;
using Application.Handlers.Chats.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous] // TODO: Temporarily for testing the frontend.
    public class ChatsController : BaseApiController
    {
        public ChatsController() { }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserChats(Guid id)
        {
            return HandleResult(await Mediator.Send(new ListChat.Query { ChatRoomId = id }));
        }

        [HttpGet]
        public async Task<IActionResult> GetUserChatRooms()
        {
            return HandleResult(await Mediator.Send(new ListChatRooms.Query()));
        }

        [HttpPost] //api/chats
        public async Task<IActionResult> CreateEvent(Guid recipientId)
        {
            return HandleResult(await Mediator.Send(new CreateChatRoom.Command { RecipientId = recipientId }));
        }
    }
}
