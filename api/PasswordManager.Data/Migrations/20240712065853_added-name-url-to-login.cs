using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class addednameurltologin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7bb7b9bb-a623-4a38-8c99-862b1243765a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b7b08e15-aa47-4541-bc2a-a5e217e62ab9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "339e1524-5373-4422-93ee-dc268e2eac2a", null, "User", "USER" },
                    { "d8e0012f-3a69-4329-a3b3-cafc9a0cc4f9", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "339e1524-5373-4422-93ee-dc268e2eac2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8e0012f-3a69-4329-a3b3-cafc9a0cc4f9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7bb7b9bb-a623-4a38-8c99-862b1243765a", null, "User", "USER" },
                    { "b7b08e15-aa47-4541-bc2a-a5e217e62ab9", null, "Admin", "ADMIN" }
                });
        }
    }
}
