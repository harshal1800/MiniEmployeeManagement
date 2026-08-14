using Microsoft.AspNetCore.Mvc;
using MiniEmployeeManagement.Api.DTOs;
using MiniEmployeeManagement.Api.Services;

namespace MiniEmployeeManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var result = await _authService.LoginAsync(request);

            if (result == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or passworrrrrd."
                });
            }

            return Ok(new
            {
                message = "Login successful.",
                email = result
            });
        }
    }
}