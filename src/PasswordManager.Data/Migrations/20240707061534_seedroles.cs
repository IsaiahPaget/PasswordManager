using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class seedroles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "appUserId",
                table: "Logins",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7f7c3a83-34bd-4e68-baf7-0884743085bf", null, "Admin", "ADMIN" },
                    { "da2a2dd7-0991-48ab-9275-9c1f256099d1", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Logins_appUserId",
                table: "Logins",
                column: "appUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Logins_AspNetUsers_appUserId",
                table: "Logins",
                column: "appUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Logins_AspNetUsers_appUserId",
                table: "Logins");

            migrationBuilder.DropIndex(
                name: "IX_Logins_appUserId",
                table: "Logins");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7f7c3a83-34bd-4e68-baf7-0884743085bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da2a2dd7-0991-48ab-9275-9c1f256099d1");

            migrationBuilder.DropColumn(
                name: "appUserId",
                table: "Logins");
        }
    }
}
