﻿using Microsoft.AspNetCore.Identity;

namespace AuthMicroservice.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        //public string Role { get;  set; }
    }
}
