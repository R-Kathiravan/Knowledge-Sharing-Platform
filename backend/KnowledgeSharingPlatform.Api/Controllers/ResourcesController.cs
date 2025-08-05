
using Dapper;
using KnowledgeSharingPlatform.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace KnowledgeSharingPlatform.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ResourcesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;

        public ResourcesController(IConfiguration config, IWebHostEnvironment env)
        {
            _config = config;
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> UploadResource([FromForm] ResourceModel model)
        {
            var uploads = Path.Combine(_env.ContentRootPath, "Uploads");
            Directory.CreateDirectory(uploads);

            var fileName = Guid.NewGuid() + Path.GetExtension(model.File.FileName);
            var filePath = Path.Combine(uploads, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.File.CopyToAsync(stream);
            }

            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = "INSERT INTO resources (event_id, file_type, file_path, status,uploaded_at) VALUES (@event_id, @file_type, @file_path, 'pending',@uploaded_at)";
            var res = await conn.ExecuteAsync(sql, new
            {
                model.Event_Id,
                model.File_Type,
                file_path = fileName,
                model.Status,
                model.uploaded_at,

            });
            return Ok(new { uploaded = res > 0 });
        }

        [HttpPost]
        public async Task<IActionResult> ApproveResource(int id)
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = "UPDATE resources SET status = 'activated' WHERE resource_id = @id";
            var res = await conn.ExecuteAsync(sql, new { id });
            return Ok(new { approved = res > 0 });
        }

        [HttpGet]
        public async Task<IActionResult> Search(string keyword)
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = "SELECT * FROM events WHERE status = 'activated' AND keywords LIKE @kw";
            var results = await conn.QueryAsync<Event>(sql, new { kw = "%" + keyword + "%" });
            return Ok(results);
        }
        [HttpGet]
        public async Task<IActionResult> GetResources()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
         SELECT * FROM resources where status='activated';";

            using var multi = await conn.QueryMultipleAsync(sql);
            var resources = (await multi.ReadAsync<Event>()).ToList();

            return Ok(new
            {
                resources
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetAllResources()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
         SELECT * FROM resources ;";

            using var multi = await conn.QueryMultipleAsync(sql);
            var resources = (await multi.ReadAsync<ResourceModel>()).ToList();

            return Ok(new
            {
                resources
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetRejectedResources()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
         SELECT * FROM resources where status = 'rejected' ;";

            using var multi = await conn.QueryMultipleAsync(sql);
            var resources = (await multi.ReadAsync<ResourceModel>()).ToList();

            return Ok(new
            {
                resources
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetApprovedResources()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
         SELECT * FROM resources where status = 'activated' ;";

            using var multi = await conn.QueryMultipleAsync(sql);
            var resources = (await multi.ReadAsync<ResourceModel>()).ToList();

            return Ok(new
            {
                resources
            });
        }
    }
}
