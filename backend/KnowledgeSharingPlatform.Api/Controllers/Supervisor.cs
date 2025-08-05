using System.Data;
using Dapper;
using KnowledgeSharingPlatform.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace KnowledgeSharingPlatform.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class SupervisorController : ControllerBase
    {
        private readonly IDbConnection _db;

        public SupervisorController(IConfiguration config)
        {
            _db = new MySqlConnection(config.GetConnectionString("DefaultConnection"));
        }
        [HttpPost("ApproveEvent/{id}")]

        public async Task<IActionResult> ApproveEvent(int event_id)
        {
            var sql = "UPDATE Events SET Status = @Status WHERE event_id = @Id";
            var affectedRows = await _db.ExecuteAsync(sql, new { Status = "activated", Id = event_id });
            if (affectedRows == 0)
                return NotFound();
            return NoContent();
        }

        [HttpPost("RejectEvent/{id}")]
        public async Task<IActionResult> RejectEvent(int event_id)
        {
            var sql = "UPDATE events SET status = 'declined' WHERE event_id = @event_id";
            await _db.ExecuteAsync(sql, new { event_id });
            return Ok();
        }

        [HttpPost("ApproveResources/{id}")]
        public async Task<IActionResult> ApproveResources(int resource_ids)
        {
            var sql = "UPDATE Resources SET status = @Status WHERE resource_id = @Id";
            var affectedRows = await _db.ExecuteAsync(sql, new { Status = "activated", Id = resource_ids });
            if (affectedRows == 0)
                return NotFound();
            return NoContent();
        }

        [HttpPost("RejectResources/{id}")]
        public async Task<IActionResult> RejectResources(int resource_ids)
        {
            var sql = "UPDATE resources SET status = 'declined' WHERE resource_id IN @resource_ids";
            await _db.ExecuteAsync(sql, new { resource_ids });
            return Ok();
        }

        [HttpGet("PendingEvents")]
        public async Task<ActionResult<IEnumerable<Event>>> GetPendingEvents()
        {
            var sql = "SELECT * FROM Events WHERE Status = @Status";
            var events = await _db.QueryAsync<Event>(sql, new { Status = "pending" });
            return Ok(events);

        }

        [HttpGet("PendingResources")]
        public async Task<ActionResult<IEnumerable<ResourceModel>>> GetPendingResources()
        {

            var sql = "SELECT * FROM Resources WHERE Status = @Status";
            var resources = await _db.QueryAsync<ResourceModel>(sql, new { Status = "pending" });
            return Ok(resources);
        }

        [HttpPost("ApproveEventAndResources/{eventId}")]
        public async Task<IActionResult> ApproveEventAndResourcesAsync(int eventId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("eid", eventId, DbType.Int32);

            await _db.ExecuteAsync("ApproveEventAndResources", parameters, commandType: CommandType.StoredProcedure);
            return Ok();
        }
        [HttpPost("RejectEventAndResources/{eventID}")]
        public async Task<IActionResult> rejectEventResources(int eventID)
        {
            var parameter = new DynamicParameters();
            parameter.Add("eventid", eventID, DbType.Int32);
            await _db.ExecuteAsync("rejectEventResources", parameter, commandType: CommandType.StoredProcedure);
            return Ok();
        }

        [HttpGet("GetByID")]
        public async Task<IActionResult> GetByID(int ID)
        {
            var parameter = new DynamicParameters();
            parameter.Add("id", ID, DbType.Int32);

            using var multi = await _db.QueryMultipleAsync("GetByID", parameter, commandType: CommandType.StoredProcedure);

            var events = (await multi.ReadAsync<Event>()).ToList();
            var resources = (await multi.ReadAsync<ResourceModel>()).ToList();

            return Ok(new
            {
                events,
                resources
            });
        }



    }
}
