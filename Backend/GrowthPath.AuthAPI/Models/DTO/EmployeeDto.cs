namespace AuthMicroservice.Models.DTO
{
    public class EmployeeDto  // Ensure it's public
    {
        //public string Id { get; set; }  // Unique Identifier for the employee
        public string Name { get; set; }        // Employee's full name
                                                //public string Email { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string role { get; set; }
    }
}