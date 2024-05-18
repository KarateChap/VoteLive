using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAdditionalId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_AspNetUsers_AppUserId1",
                table: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Topics_AppUserId1",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "Topics");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Topics",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_AppUserId",
                table: "Topics",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_AspNetUsers_AppUserId",
                table: "Topics",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_AspNetUsers_AppUserId",
                table: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Topics_AppUserId",
                table: "Topics");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Topics",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "Topics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Topics_AppUserId1",
                table: "Topics",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_AspNetUsers_AppUserId1",
                table: "Topics",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
