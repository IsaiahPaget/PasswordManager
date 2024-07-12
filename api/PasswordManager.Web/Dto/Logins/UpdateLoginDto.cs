using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Web.Dto.LoginDto
{
    public class UpdateLoginDto
    {
        [Required]
        public long id { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "Name cannot be less than 3 characters")]
        public string name { get; set; } = string.Empty;

        [Required]
        [MinLength(4, ErrorMessage = "Url cannot be less than 4 characters")]
        public string url { get; set; } = string.Empty;

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
