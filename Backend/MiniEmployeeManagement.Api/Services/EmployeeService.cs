using Microsoft.EntityFrameworkCore;
using MiniEmployeeManagement.Api.Data;
using MiniEmployeeManagement.Api.DTOs;
using MiniEmployeeManagement.Api.Models;

namespace MiniEmployeeManagement.Api.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Employee> CreateAsync(CreateEmployeeDto request)
        {
            var employee = new Employee
            {
                Name = request.Name,
                Email = request.Email,
                Department = request.Department,
                Designation = request.Designation,
                Salary = request.Salary
            };

            _context.Employees.Add(employee);

            await _context.SaveChangesAsync();

            return employee;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Employee?> UpdateAsync(
    int id,
    UpdateEmployeeDto request)
        {
            var employee = await _context.Employees
                .FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return null;
            }

            employee.Name = request.Name;
            employee.Email = request.Email;
            employee.Department = request.Department;
            employee.Designation = request.Designation;
            employee.Salary = request.Salary;

            await _context.SaveChangesAsync();

            return employee;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _context.Employees
                .FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return false;
            }

            _context.Employees.Remove(employee);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}