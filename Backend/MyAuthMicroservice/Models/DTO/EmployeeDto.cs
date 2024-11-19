namespace MyAuthMicroservice.Models.DTO
{
    public class EmployeeDto
    {
        public string Name { get; set; }        // Employee's full name
                                                //public string Email { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string role { get; set; }
    }
}
