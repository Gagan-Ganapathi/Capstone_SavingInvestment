using MyAuthMicroservice.Models.DTO;

namespace MyAuthMicroservice.Service
{
    public interface IUserService
    {
        Task<List<EmployeeDto>> GetUsersByRole(string role);

    }
}
