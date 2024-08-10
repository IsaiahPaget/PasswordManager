using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Web.Dto.Account
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username cannot be less than 3 characters")]
        [MaxLength(384, ErrorMessage = "Username cannot be over 384 characters")]
        public string userName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MinLength(3, ErrorMessage = "Email cannot be less than 3 characters")]
        [MaxLength(384, ErrorMessage = "Email cannot be over 384 characters")]
        public string email { get; set; } = string.Empty;

        [Required] 
        [MinLength(12, ErrorMessage = "Password cannot be less than 12 characters")]
        [MaxLength(408, ErrorMessage = "Password cannot be over 408 characters")]
        public string password { get; set; } = string.Empty;
    }
}
