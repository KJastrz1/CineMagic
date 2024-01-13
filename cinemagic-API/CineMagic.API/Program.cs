using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using CineMagic.API.Models;
using CineMagic.API.Services.AuthService;
using CineMagic.API.Services.MovieService;
using CineMagic.Shared.Services.MovieService;
using System.Text;
using CineMagic.Shared.Mappers;
using CineMagic.DataSeeder;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(MovieMapper));

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IMovieService, CineMagic.API.Services.MovieService.MovieService>();
builder.Services.AddScoped<ICommentService, CineMagic.API.Services.MovieService.CommentService>();
builder.Services.AddScoped<IRatingService, CineMagic.API.Services.MovieService.RatingService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<CineMagic.API.Services.FileService>();
builder.Services.AddScoped<UserSeeder>();

string token = builder.Configuration.GetSection("AppSettings:Token").Value;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        // options.Authority = "https://localhost:5001";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token)),
            ValidateIssuerSigningKey = true,
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                if (context.Request.Cookies.ContainsKey("_auth"))
                {
                    context.Token = context.Request.Cookies["_auth"];
                }
                return Task.CompletedTask;
            }
        };
    });


var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", builder =>
        builder.AllowAnyHeader()
               .AllowAnyMethod()
               .WithOrigins(allowedOrigins)
               .AllowCredentials());
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<DataContext>();
    dbContext.Database.Migrate();
    var seeder = services.GetRequiredService<UserSeeder>();
    await seeder.SeedUsersAsync();
}

app.UseCors("MyCorsPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
