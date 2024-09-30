using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class moved_to_linux : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3aafd449-1093-4fd4-aaf8-2b2e53d59c22");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51e3473e-d889-4663-9a0e-ad2842cb60ab");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4acb412d-cbfe-4a1c-867b-043f9baceb4e", null, "User", "USER" },
                    { "62f5c06f-1578-4c78-ae94-efcbfb217ba0", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "3aafd449-1093-4fd4-aaf8-2b2e53d59c22", null, "Admin", "ADMIN" },
                    { "51e3473e-d889-4663-9a0e-ad2842cb60ab", null, "User", "USER" }
                });
        }
    }
}
