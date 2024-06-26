using PasswordManager.Data;

namespace PasswordManager.Web.Dto.LoginDto
{
    public static class LoginMapper
    {
        public static Login ToLogin(this NewLoginRequest loginRequest)
        {
            return new Login
            {
                userId = loginRequest.userId,
                username = loginRequest.username,
                password = loginRequest.password,
                notes = loginRequest.notes,
            };
        }
        public static LoginDto ToLoginDto(this Login login)
        {
            return new LoginDto
            {

                id = login.id,
                userId = login.userId,
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
                userId = loginDto.userId,
                username = loginDto.username,
                password = loginDto.password,
                notes = loginDto.notes,
                createdOn = loginDto.createdOn,
                updatedOn = loginDto.updatedOn,
            };
        }
    }
}
