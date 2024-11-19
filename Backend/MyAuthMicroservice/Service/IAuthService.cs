using MyAuthMicroservice.Models;
using MyAuthMicroservice.Models.DTO;

namespace MyAuthMicroservice.Service
{
    public interface IAuthService
    {

        Task<string> Register(RegistrationRequestDto registrationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> AssignRole(string email, string rolename);
        Task<UserDto> GetUserByIdAsync(string userId);
        Task<List<UserDto>> GetAllUsersAsync(); // New method
        Task<bool> UpdateUserAsync(string userId, UserDto updatedUser);

    }
}
