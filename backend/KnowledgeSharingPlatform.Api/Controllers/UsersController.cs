using Dapper;
using KnowledgeSharingPlatform.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace KnowledgeSharingPlatform.Api.Controllers
{
    public class UsersController : Controller
    {
        private IConfiguration _config;

        public UsersController(IConfiguration config)
        {
            _config = config;
        }
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest req)
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = "SELECT * FROM users WHERE email = @Email LIMIT 1";
            var user = await conn.QueryFirstOrDefaultAsync<User>(sql, new { req.Email });

            if (user == null)
                return Unauthorized(new { message = "User not found" });

            return Ok(user);
        }

        public class UserLoginRequest { public string Email { get; set; } }

    }
}
