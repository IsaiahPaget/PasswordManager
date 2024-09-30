using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services.Types
{
    public static class CSVMapper
    {
        public static CSVLogin ToCSVLogin(this Login login)
        {
            return new CSVLogin
            {
                name = login.name,
                url = login.url,
                username = login.username,
                password = login.password,
                notes = login.notes,
                createdOn = login.createdOn,
                updatedOn = login.updatedOn,
            };
        }
        public static Login ToLogin(this CSVLogin csvLogin)
        {

            return new Login
            {
                name = TruncateString(csvLogin.name, 50),
                url = TruncateString(csvLogin.url, 256),
                username = TruncateString(csvLogin.username, 512),
                password = TruncateString(csvLogin.password, 512),
                notes = TruncateString(csvLogin.notes, 512),
            };
        }
        private static string TruncateString(string input, int maxLength)
        {
            return input.Length > maxLength ? input.Substring(0, maxLength) : input;
        }
    }
}
