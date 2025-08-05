
using Google.Apis.Auth;
using KnowledgeSharingPlatform.Api.Data;
using KnowledgeSharingPlatform.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KnowledgeSharingPlatform.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _users;
        private readonly JwtConfig _jwt;
        public AuthController(IUserRepository users, IOptions<JwtConfig> jwt)
        {
            _users = users;
            _jwt = jwt.Value;
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenModel model)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(model.Token);
                var user = await _users.GetByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new User
                    {
                        Email = payload.Email,
                        Name = payload.Name ?? string.Empty,
                        PictureUrl = payload.Picture ?? string.Empty,
                        Role = "Faculty",
                        LastLogin = DateTime.UtcNow
                    };
                    user.Id = await _users.InsertAsync(user);
                }
                else
                {
                    user.LastLogin = DateTime.UtcNow;
                    await _users.UpdateAsync(user);
                }

                var token = GenerateToken(user);
                return Ok(new
                {
                    token,
                    user = new { user.Id, user.Name, user.Email, user.PictureUrl, user.Role }
                });
            }
            catch
            {
                return Unauthorized();
            }
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("role", user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        public class GoogleTokenModel { public string Token { get; set; } = string.Empty; }
    }
}
