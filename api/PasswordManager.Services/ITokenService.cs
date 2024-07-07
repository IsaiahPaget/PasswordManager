using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
