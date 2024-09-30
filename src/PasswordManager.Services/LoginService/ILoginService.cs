using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using PasswordManager.Data.Models;
using PasswordManager.Services.Types;

namespace PasswordManager.Services.LoginService
{
    public interface ILoginService
    {
        public Task<LoginsRequest> GetAllLogins(int startIndex, int maxRecords, string searchTerm, string userId);
        public Task<List<Login>> GetAllLogins(string userId);
        public Task<Login> GetLogin(long id, string userId);
        public Task DeleteLogin(Login login);
        public Task CreateLogin(Login login);
        public Task<Login> UpdateLogin(long loginId, Login login, string userId);
    }
}
