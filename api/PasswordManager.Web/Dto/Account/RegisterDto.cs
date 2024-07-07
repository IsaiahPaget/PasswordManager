using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Web.Dto.Account
{
    public class RegisterDto
    {
        [Required]
        public string? userName { get; set; }

        [Required]
        [EmailAddress]
        public string? email { get; set; }

        [Required] 
        public string? password { get; set;}
    }
}
