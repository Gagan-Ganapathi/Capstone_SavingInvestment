using AuthMicroservice.Models;
using AuthMicroservice.Models.DTO;

namespace AuthMicroservice.Service
{
    public interface IAuthService
    {
        Task<string> Register(RegistrationRequestDto registrationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> AssignRole(string email, string rolename);
        Task<ApplicationUser> GetUserByIdAsync(string userId);
        Task<List<UserDto>> GetAllUsersAsync(); // New method


    }
}
