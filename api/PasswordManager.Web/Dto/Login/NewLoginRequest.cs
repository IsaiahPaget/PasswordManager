using System;
using System.ComponentModel.DataAnnotations;
namespace PasswordManager.Web.Dto.LoginDto
{
    public class NewLoginRequest
    {
        [Required]
        public long userId { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Username cannot be less than 3 characters")]
        [MaxLength(255, ErrorMessage = "Username cannot be over 255 characters")]
        public string username { get; set; } = string.Empty;

        [Required]
        [MinLength(12, ErrorMessage = "Password cannot be less than 12 characters")]
        [MaxLength(512, ErrorMessage = "Password cannot be over 512 characters")]
        public string password { get; set; } = string.Empty; 
        public string notes { get; set; } = string.Empty;
    }
}
