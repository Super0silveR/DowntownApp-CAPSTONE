using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class ChangesInConfigsMore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_USER_CHAT_ROOM_USER_CHAT_ID",
                table: "UserChats");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChats_ChatRooms_ChatRoomId",
                table: "UserChats");

            migrationBuilder.DropIndex(
                name: "IX_UserChats_ChatRoomId_UserId",
                table: "UserChats");

            migrationBuilder.CreateIndex(
                name: "IX_UserChats_ChatRoomId",
                table: "UserChats",
                column: "ChatRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_USER_CHAT_USER_CHAT_ROOM_ID",
                table: "UserChats",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_USER_CHAT_USER_CHAT_ROOM_ID",
                table: "UserChats");

            migrationBuilder.DropIndex(
                name: "IX_UserChats_ChatRoomId",
                table: "UserChats");

            migrationBuilder.CreateIndex(
                name: "IX_UserChats_ChatRoomId_UserId",
                table: "UserChats",
                columns: new[] { "ChatRoomId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_USER_CHAT_ROOM_USER_CHAT_ID",
                table: "UserChats",
                columns: new[] { "ChatRoomId", "UserId" },
                principalTable: "UserChatRooms",
                principalColumns: new[] { "ChatRoomId", "UserId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChats_ChatRooms_ChatRoomId",
                table: "UserChats",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
