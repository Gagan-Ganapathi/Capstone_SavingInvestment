using MyAuthMicroservice.Models;

namespace MyAuthMicroservice.Service
{
    public interface IJwtTokenGenerator
    {
        Task<string> GenerateToken(ApplicationUser applicationUser);

    }
}
