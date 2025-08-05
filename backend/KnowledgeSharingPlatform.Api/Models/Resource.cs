
namespace KnowledgeSharingPlatform.Api.Models
{
    public class Resource
    {
        public int resource_id { get; set; }
        public int event_id { get; set; }
        public string file_type { get; set; } = string.Empty;
        public string file_path { get; set; } = string.Empty;
        //public bool IsActive { get; set; }
        public int ViewCount { get; set; }
        public DateTime uploaded_at { get; set; }
        public string status { get; set; }
    }
}
