using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class linux_pls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4acb412d-cbfe-4a1c-867b-043f9baceb4e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "62f5c06f-1578-4c78-ae94-efcbfb217ba0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49bed12f-7958-42c5-bbca-1b3c388e576d", null, "Admin", "ADMIN" },
                    { "6a836d82-b12d-4c03-b676-35e2626060ca", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49bed12f-7958-42c5-bbca-1b3c388e576d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a836d82-b12d-4c03-b676-35e2626060ca");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4acb412d-cbfe-4a1c-867b-043f9baceb4e", null, "User", "USER" },
                    { "62f5c06f-1578-4c78-ae94-efcbfb217ba0", null, "Admin", "ADMIN" }
                });
        }
    }
}
