
using Dapper;
using KnowledgeSharingPlatform.Api.Models;

namespace KnowledgeSharingPlatform.Api.Data
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<int> InsertAsync(User user);
        Task UpdateAsync(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;
        public UserRepository(DapperContext context) => _context = context;

        public async Task<User?> GetByEmailAsync(string email)
        {
            var sql = "SELECT * FROM Users WHERE Email = @Email LIMIT 1";
            using var conn = _context.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<int> InsertAsync(User user)
        {
            var sql = @"INSERT INTO Users (Name, Email, PictureUrl, Role, LastLogin)
                         VALUES (@Name, @Email, @PictureUrl, @Role, @LastLogin);
                         SELECT LAST_INSERT_ID();";
            using var conn = _context.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(sql, user);
        }

        public async Task UpdateAsync(User user)
        {
            var sql = @"UPDATE Users SET Name=@Name, PictureUrl=@PictureUrl, Role=@Role, LastLogin=@LastLogin WHERE Id=@Id";
            using var conn = _context.CreateConnection();
            await conn.ExecuteAsync(sql, user);
        }
    }
}
