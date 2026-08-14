using Microsoft.EntityFrameworkCore;
using MiniEmployeeManagement.Api.Data;
using MiniEmployeeManagement.Api.DTOs;

namespace MiniEmployeeManagement.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string?> LoginAsync(LoginRequestDto request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.Email == request.Email &&
                    x.PasswordHash == request.Password);

            if (user == null)
            {
                return null;
            }

            return user.Email;
        }
    }
}