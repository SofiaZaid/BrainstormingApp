using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BrainstormingApp.Data.Migrations
{
    public partial class Addednewdefaultvalueindatacontextclassformessagepropertymessagearchived : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "MessageArchived",
                table: "Messages",
                nullable: true,
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "MessageArchived",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
