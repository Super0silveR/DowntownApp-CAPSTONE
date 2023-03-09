using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class EventTypeCreatorId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "EventTypes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "ChallengeTypes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EventTypes_CreatorId",
                table: "EventTypes",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeTypes_CreatorId",
                table: "ChallengeTypes",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChallengeTypes_Users_CreatorId",
                table: "ChallengeTypes",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EVENT_TYPE_CREATED_BY",
                table: "EventTypes",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChallengeTypes_Users_CreatorId",
                table: "ChallengeTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_EVENT_TYPE_CREATED_BY",
                table: "EventTypes");

            migrationBuilder.DropIndex(
                name: "IX_EventTypes_CreatorId",
                table: "EventTypes");

            migrationBuilder.DropIndex(
                name: "IX_ChallengeTypes_CreatorId",
                table: "ChallengeTypes");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "EventTypes");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "ChallengeTypes");
        }
    }
}
