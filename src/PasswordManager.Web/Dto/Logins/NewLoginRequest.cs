using System;
using System.ComponentModel.DataAnnotations;
namespace PasswordManager.Web.Dto.LoginDto
{
    public class NewLoginRequest
    {
        [Required]
        [MinLength(3, ErrorMessage = "Name cannot be less than 3 characters")]
        [MaxLength(256, ErrorMessage = "Name cannot be over 256 characters")]
        public string name { get; set; } = string.Empty;

        [Required]
        [MinLength(4, ErrorMessage = "Url cannot be less than 4 characters")]
        [MaxLength(256, ErrorMessage = "Url cannot be over 256 characters")]
        public string url { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Username cannot be less than 3 characters")]
        [MaxLength(384, ErrorMessage = "Username cannot be over 384 characters")]
        public string username { get; set; } = string.Empty;

        [Required]
        [MinLength(12, ErrorMessage = "Password cannot be less than 12 characters")]
        [MaxLength(408, ErrorMessage = "Password cannot be over 408 characters")]
        public string password { get; set; } = string.Empty;

        [MaxLength(748, ErrorMessage = "Notes cannot be over 748 characters")]
        public string notes { get; set; } = string.Empty;
    }
}
