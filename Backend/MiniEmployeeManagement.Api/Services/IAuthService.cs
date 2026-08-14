using MiniEmployeeManagement.Api.DTOs;

namespace MiniEmployeeManagement.Api.Services
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(LoginRequestDto request);
    }
}