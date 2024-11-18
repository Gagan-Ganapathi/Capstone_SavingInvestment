using AuthMicroservice.Models.DTO;

namespace AuthMicroservice.Service
{
    public interface IUserService
    {

        Task<List<EmployeeDto>> GetUsersByRole(string role);


    }
}
