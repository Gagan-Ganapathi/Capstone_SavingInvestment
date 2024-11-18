using AuthMicroservice.Models;

namespace AuthMicroservice.Service
{
    public interface IJwtTokenGenerator
    {
        Task<string> GenerateToken(ApplicationUser applicationUser);
    }
}
