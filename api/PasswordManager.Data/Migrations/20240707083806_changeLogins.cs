using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class changeLogins : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7f7c3a83-34bd-4e68-baf7-0884743085bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da2a2dd7-0991-48ab-9275-9c1f256099d1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ad4ee945-be74-40ef-83a4-ecb505c52aa9", null, "Admin", "ADMIN" },
                    { "f7c71dbb-3b37-4127-93b6-3868c2c50cc2", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad4ee945-be74-40ef-83a4-ecb505c52aa9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7c71dbb-3b37-4127-93b6-3868c2c50cc2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7f7c3a83-34bd-4e68-baf7-0884743085bf", null, "Admin", "ADMIN" },
                    { "da2a2dd7-0991-48ab-9275-9c1f256099d1", null, "User", "USER" }
                });
        }
    }
}
