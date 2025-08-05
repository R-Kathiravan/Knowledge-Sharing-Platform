using Microsoft.AspNetCore.Mvc;

namespace KnowledgeSharingPlatform.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {

        [HttpGet("view/{fileName}")]
        public IActionResult ViewFile(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uplads", fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found");

            var ext = Path.GetExtension(filePath).ToLowerInvariant();
            var contentType = ext switch
            {
                ".pdf" => "application/pdf",
                ".doc" => "application/msword",
                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".xls" => "application/vnd.ms-excel",
                ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".png" => "image/png",
                ".jpg" => "image/jpeg",
                _ => "application/octet-stream"
            };

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(stream, contentType);
        }


    }
}

