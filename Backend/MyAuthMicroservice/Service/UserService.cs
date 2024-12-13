﻿using Microsoft.EntityFrameworkCore;
using MyAuthMicroservice.Data;
using MyAuthMicroservice.Models.DTO;

namespace MyAuthMicroservice.Service
{
    public class UserService: IUserService
    {

        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EmployeeDto>> GetUsersByRole(string role)
        {
            var users = await _context.Roles
                .Where(u => u.Name == role) // Filtering by role
                .ToListAsync();

            var employeeDtos = users.Select(u => new EmployeeDto
            {

                Name = u.Name,

            }).ToList();

            return employeeDtos;
        }
    }
}
