using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddNameAndUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "339e1524-5373-4422-93ee-dc268e2eac2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8e0012f-3a69-4329-a3b3-cafc9a0cc4f9");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Logins",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "url",
                table: "Logins",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3aafd449-1093-4fd4-aaf8-2b2e53d59c22", null, "Admin", "ADMIN" },
                    { "51e3473e-d889-4663-9a0e-ad2842cb60ab", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3aafd449-1093-4fd4-aaf8-2b2e53d59c22");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51e3473e-d889-4663-9a0e-ad2842cb60ab");

            migrationBuilder.DropColumn(
                name: "name",
                table: "Logins");

            migrationBuilder.DropColumn(
                name: "url",
                table: "Logins");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "339e1524-5373-4422-93ee-dc268e2eac2a", null, "User", "USER" },
                    { "d8e0012f-3a69-4329-a3b3-cafc9a0cc4f9", null, "Admin", "ADMIN" }
                });
        }
    }
}
