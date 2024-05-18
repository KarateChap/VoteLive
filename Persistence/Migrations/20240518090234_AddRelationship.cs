using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserOption");

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Topics",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "Topics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserOptions",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    OptionId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOptions", x => new { x.AppUserId, x.OptionId });
                    table.ForeignKey(
                        name: "FK_UserOptions_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOptions_Options_OptionId",
                        column: x => x.OptionId,
                        principalTable: "Options",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Topics_AppUserId1",
                table: "Topics",
                column: "AppUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserOptions_OptionId",
                table: "UserOptions",
                column: "OptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_AspNetUsers_AppUserId1",
                table: "Topics",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_AspNetUsers_AppUserId1",
                table: "Topics");

            migrationBuilder.DropTable(
                name: "UserOptions");

            migrationBuilder.DropIndex(
                name: "IX_Topics_AppUserId1",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "Topics");

            migrationBuilder.CreateTable(
                name: "AppUserOption",
                columns: table => new
                {
                    OptionsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    VotersId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserOption", x => new { x.OptionsId, x.VotersId });
                    table.ForeignKey(
                        name: "FK_AppUserOption_AspNetUsers_VotersId",
                        column: x => x.VotersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserOption_Options_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "Options",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserOption_VotersId",
                table: "AppUserOption",
                column: "VotersId");
        }
    }
}
