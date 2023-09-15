using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class UpdatesForTicketingPurposes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CHALLENGE_BAR_EVENT_CHALLENGES",
                table: "BarEventChallenges");

            migrationBuilder.DropForeignKey(
                name: "FK_EVENT_SCHEDULED_BAR_EVENTS",
                table: "BarEvents");

            migrationBuilder.RenameColumn(
                name: "BarEventId",
                table: "BarEventComments",
                newName: "EventId");

            migrationBuilder.RenameIndex(
                name: "IX_BarEventComments_BarEventId_AttendeeId",
                table: "BarEventComments",
                newName: "IX_BarEventComments_EventId_AttendeeId");

            migrationBuilder.RenameColumn(
                name: "BarEventId",
                table: "BarEventChallenges",
                newName: "EventId");

            migrationBuilder.RenameColumn(
                name: "BarEventId",
                table: "BarEventAttendees",
                newName: "EventId");

            migrationBuilder.RenameIndex(
                name: "IX_BarEventAttendees_BarEventId",
                table: "BarEventAttendees",
                newName: "IX_BarEventAttendees_EventId");

            migrationBuilder.AddColumn<Guid>(
                name: "TicketId",
                table: "BarEventAttendees",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EventsTickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ScheduledEventId = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<double>(type: "double precision", nullable: true),
                    TicketClassification = table.Column<int>(type: "integer", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EVENT_EVENT_TICKET_ID",
                        column: x => x.ScheduledEventId,
                        principalTable: "BarEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BarEventAttendees_TicketId",
                table: "BarEventAttendees",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsTickets_ScheduledEventId",
                table: "EventsTickets",
                column: "ScheduledEventId");

            migrationBuilder.AddForeignKey(
                name: "FK_BarEventAttendees_EventsTickets_TicketId",
                table: "BarEventAttendees",
                column: "TicketId",
                principalTable: "EventsTickets",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BAR_EVENT_CHALLENGE_CHALLENGE_ID",
                table: "BarEventChallenges",
                column: "ChallengeId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BAR_EVENT_EVENT_ID",
                table: "BarEvents",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BarEventAttendees_EventsTickets_TicketId",
                table: "BarEventAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_BAR_EVENT_CHALLENGE_CHALLENGE_ID",
                table: "BarEventChallenges");

            migrationBuilder.DropForeignKey(
                name: "FK_BAR_EVENT_EVENT_ID",
                table: "BarEvents");

            migrationBuilder.DropTable(
                name: "EventsTickets");

            migrationBuilder.DropIndex(
                name: "IX_BarEventAttendees_TicketId",
                table: "BarEventAttendees");

            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "BarEventAttendees");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "BarEventComments",
                newName: "BarEventId");

            migrationBuilder.RenameIndex(
                name: "IX_BarEventComments_EventId_AttendeeId",
                table: "BarEventComments",
                newName: "IX_BarEventComments_BarEventId_AttendeeId");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "BarEventChallenges",
                newName: "BarEventId");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "BarEventAttendees",
                newName: "BarEventId");

            migrationBuilder.RenameIndex(
                name: "IX_BarEventAttendees_EventId",
                table: "BarEventAttendees",
                newName: "IX_BarEventAttendees_BarEventId");

            migrationBuilder.AddForeignKey(
                name: "FK_CHALLENGE_BAR_EVENT_CHALLENGES",
                table: "BarEventChallenges",
                column: "ChallengeId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EVENT_SCHEDULED_BAR_EVENTS",
                table: "BarEvents",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
