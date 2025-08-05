
using Dapper;
using KnowledgeSharingPlatform.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace KnowledgeSharingPlatform.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class EventsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public EventsController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitEvent([FromBody] Event model)
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));

            var query = @"
        INSERT INTO events (title, type, organized_by, start_date, end_date, keywords, user_id,status) 
        VALUES (@title, @type, @organized_by, @start_date, @end_date, @keywords, @user_id,'pending');
        SELECT LAST_INSERT_ID();";

            var insertedId = await conn.ExecuteScalarAsync<long>(query, model);

            return Ok(new { success = insertedId > 0, eventId = insertedId });
        }


        [HttpGet]
        public async Task<IActionResult> SelectRes()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
        SELECT * FROM events;
        SELECT * FROM resources;
    ";

            using var multi = await conn.QueryMultipleAsync(sql);
            var events = (await multi.ReadAsync<Event>()).ToList();
            var resources = (await multi.ReadAsync<ResourceModel>()).ToList();

            return Ok(new
            {
                events,
                resources
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
        SELECT * FROM events";
            using var multi = await conn.QueryMultipleAsync(sql);
            var events = (await multi.ReadAsync<Event>()).ToList();

            return Ok(new
            {
                events
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetRejectedEvents()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
        SELECT * FROM events where status = 'rejected';";
            using var multi = await conn.QueryMultipleAsync(sql);
            var events = (await multi.ReadAsync<Event>()).ToList();

            return Ok(new
            {
                events
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetApprovedEvents()
        {
            using var conn = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
            var sql = @"
        SELECT * FROM events where status = 'activated';";
            using var multi = await conn.QueryMultipleAsync(sql);
            var events = (await multi.ReadAsync<Event>()).ToList();

            return Ok(new
            {
                events
            });
        }
    }
}
