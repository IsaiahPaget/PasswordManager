using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PasswordManager.Data;

namespace PasswordManager.Services
{
    public interface ILoginService
    {
        public Task<List<Login>> GetAllLogins(int startIndex, int maxRecords, string searchTerm);
        public Task<Login> GetLogin(long id);
        public void DeleteLogin(long id);
        public Task CreateLogin(Login login);
        public Task<long> UpdateLogin(Login login);
    }
}
