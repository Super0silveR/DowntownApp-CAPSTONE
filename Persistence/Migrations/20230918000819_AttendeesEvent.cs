using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AttendeesEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BAR_EVENT_ATTENDEES",
                table: "ScheduledEventAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_BAR_EVENT_COMMENT_BAR_EVENT_ID_ATTENDEE_ID",
                table: "ScheduledEventComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BAR_EVENT_ATTENDEE_ID",
                table: "ScheduledEventAttendees");

            migrationBuilder.AlterColumn<Guid>(
                name: "EventId",
                table: "ScheduledEventAttendees",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "ScheduledEventId",
                table: "ScheduledEventAttendees",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_BAR_EVENT_ATTENDEE_ID",
                table: "ScheduledEventAttendees",
                columns: new[] { "AttendeeId", "ScheduledEventId" });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduledEventAttendees_ScheduledEventId",
                table: "ScheduledEventAttendees",
                column: "ScheduledEventId");

            migrationBuilder.AddForeignKey(
                name: "FK_BAR_EVENT_ATTENDEES",
                table: "ScheduledEventAttendees",
                column: "ScheduledEventId",
                principalTable: "ScheduledEvents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduledEventAttendees_Events_EventId",
                table: "ScheduledEventAttendees",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BAR_EVENT_COMMENT_BAR_EVENT_ID_ATTENDEE_ID",
                table: "ScheduledEventComments",
                columns: new[] { "EventId", "AttendeeId" },
                principalTable: "ScheduledEventAttendees",
                principalColumns: new[] { "AttendeeId", "ScheduledEventId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BAR_EVENT_ATTENDEES",
                table: "ScheduledEventAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_ScheduledEventAttendees_Events_EventId",
                table: "ScheduledEventAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_BAR_EVENT_COMMENT_BAR_EVENT_ID_ATTENDEE_ID",
                table: "ScheduledEventComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BAR_EVENT_ATTENDEE_ID",
                table: "ScheduledEventAttendees");

            migrationBuilder.DropIndex(
                name: "IX_ScheduledEventAttendees_ScheduledEventId",
                table: "ScheduledEventAttendees");

            migrationBuilder.DropColumn(
                name: "ScheduledEventId",
                table: "ScheduledEventAttendees");

            migrationBuilder.AlterColumn<Guid>(
                name: "EventId",
                table: "ScheduledEventAttendees",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BAR_EVENT_ATTENDEE_ID",
                table: "ScheduledEventAttendees",
                columns: new[] { "AttendeeId", "EventId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BAR_EVENT_ATTENDEES",
                table: "ScheduledEventAttendees",
                column: "EventId",
                principalTable: "ScheduledEvents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BAR_EVENT_COMMENT_BAR_EVENT_ID_ATTENDEE_ID",
                table: "ScheduledEventComments",
                columns: new[] { "EventId", "AttendeeId" },
                principalTable: "ScheduledEventAttendees",
                principalColumns: new[] { "AttendeeId", "EventId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
