using Microsoft.AspNetCore.Identity;

namespace MyAuthMicroservice.Models
{
    public class ApplicationUser: IdentityUser
    {
        public string Name { get; set; }
    }
}
