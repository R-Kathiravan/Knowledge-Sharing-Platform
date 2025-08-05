namespace KnowledgeSharingPlatform.Api.Models
{
    public class ResourceModel
    {
        public int Resource_Id { get; set; }
        public int Event_Id { get; set; }
        public string File_Type { get; set; }
        public string File_Path { get; set; }
        public IFormFile File { get; set; }

        public string Status { get; set; }
        public string views { get; set; }

        public string uploaded_at { get; set; }
    }
}
