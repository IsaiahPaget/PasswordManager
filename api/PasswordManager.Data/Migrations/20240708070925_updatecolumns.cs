using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PasswordManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatecolumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad4ee945-be74-40ef-83a4-ecb505c52aa9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7c71dbb-3b37-4127-93b6-3868c2c50cc2");

            migrationBuilder.AlterColumn<string>(
                name: "userId",
                table: "Logins",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7bb7b9bb-a623-4a38-8c99-862b1243765a", null, "User", "USER" },
                    { "b7b08e15-aa47-4541-bc2a-a5e217e62ab9", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7bb7b9bb-a623-4a38-8c99-862b1243765a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b7b08e15-aa47-4541-bc2a-a5e217e62ab9");

            migrationBuilder.AlterColumn<long>(
                name: "userId",
                table: "Logins",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ad4ee945-be74-40ef-83a4-ecb505c52aa9", null, "Admin", "ADMIN" },
                    { "f7c71dbb-3b37-4127-93b6-3868c2c50cc2", null, "User", "USER" }
                });
        }
    }
}
