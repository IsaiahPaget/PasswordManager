using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Web.Dto.Account
{
    public class AuthenticationRequestDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
