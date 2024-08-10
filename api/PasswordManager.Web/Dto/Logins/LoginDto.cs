using System;
using System.ComponentModel.DataAnnotations;
namespace PasswordManager.Web.Dto.LoginDto
{
    public class LoginDto
    {
        [Required]
        public long id { get; set; }

        [Required]
        public string name { get; set; } = string.Empty;

        [Required]
        public string url { get; set; } = string.Empty;

        [Required]
        public string username { get; set; } = string.Empty;

        [Required]
        public string password { get; set; } = string.Empty;

        public string notes { get; set; } = string.Empty;

        public DateTime createdOn { get; set; }

        public DateTime updatedOn { get; set; }
    }
}
