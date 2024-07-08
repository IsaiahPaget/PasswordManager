using PasswordManager.Data.Models;

namespace PasswordManager.Web.Dto.LoginDto
{
    public static class LoginMapper
    {
        public static Login ToLogin(this NewLoginRequest loginRequest)
        {
            return new Login
            {
                username = loginRequest.username,
                password = loginRequest.password,
                notes = loginRequest.notes,
            };
        }
        public static Login ToLogin(this UpdateLoginDto login) 
        {
            return new Login
            {

                id = login.id,
                username = login.username,
                password = login.password,
                notes = login.notes,
            };
        }
        public static LoginDto ToLoginDto(this Login login)
        {
            return new LoginDto
            {

                id = login.id,
                username = login.username,
                password = login.password,
                notes = login.notes,
                createdOn = login.createdOn,
                updatedOn = login.updatedOn,
            };
        }
        public static Login ToLogin(this LoginDto loginDto) 
        { 
            return new Login
            {

                id = loginDto.id,
                username = loginDto.username,
                password = loginDto.password,
                notes = loginDto.notes,
                createdOn = loginDto.createdOn,
                updatedOn = loginDto.updatedOn,
            };
        }
    }
}
