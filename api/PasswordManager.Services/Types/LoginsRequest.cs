using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services.Types
{
    public class LoginsRequest
    {
        public List<Login>? logins { get; set; }
        public long rowCount { get; set; }
    }
}
