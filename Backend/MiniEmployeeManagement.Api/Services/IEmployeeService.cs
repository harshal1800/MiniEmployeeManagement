using MiniEmployeeManagement.Api.DTOs;
using MiniEmployeeManagement.Api.Models;

namespace MiniEmployeeManagement.Api.Services
{
    public interface IEmployeeService
    {
        Task<Employee> CreateAsync(CreateEmployeeDto request);
        Task<List<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee?> UpdateAsync(int id, UpdateEmployeeDto request);

        Task<bool> DeleteAsync(int id);
    }

}