using Microsoft.EntityFrameworkCore;
using MiniEmployeeManagement.Api.Data;
using MiniEmployeeManagement.Api.Services;



namespace MiniEmployeeManagement.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register the DbContext with the connection string from appsettings. json
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

            // Add services to the container.
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();

            builder.Services.AddControllers();

            // Configure CORS to allow requests from the React app
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("ReactApp");


            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
