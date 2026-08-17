using Microsoft.AspNetCore.Mvc;
using MiniEmployeeManagement.Api.DTOs;
using MiniEmployeeManagement.Api.Services;

namespace MiniEmployeeManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeDto request)
        {
            var employee = await _employeeService.CreateAsync(request);

            return CreatedAtAction(
                nameof(Create),
                new { id = employee.Id },
                employee);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _employeeService.GetAllAsync();

            return Ok(employees);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);

            if (employee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found."
                });
            }

            return Ok(employee);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
    int id,
    UpdateEmployeeDto request)
        {
            var employee = await _employeeService.UpdateAsync(id, request);

            if (employee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found."
                });
            }

            return Ok(employee);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _employeeService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Employee not found."
                });
            }

            return NoContent();
        }

    }
}