using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BrainstormingApp.Data.Migrations
{
    public partial class Adddatetimetomessagetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "MessageCreated",
                table: "Messages",
                nullable: false,
                defaultValueSql: "getdate()");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MessageCreated",
                table: "Messages");
        }
    }
}
