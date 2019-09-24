using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BrainstormingApp.Data.Migrations
{
    public partial class Changedatamodelformessagesinceweneedtoincludeanarchivedcolumntomarkwhenamessageisremovedonclientside : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "MessageArchived",
                table: "Messages",
                nullable: true,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MessageArchived",
                table: "Messages");
        }
    }
}
