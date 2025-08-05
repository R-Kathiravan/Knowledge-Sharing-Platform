
namespace KnowledgeSharingPlatform.Api.Models
{
    public class Event
    {
        public int event_id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Organized_By { get; set; } = string.Empty;
        public string Keywords { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string status { get; set; }
    }
}
