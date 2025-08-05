
namespace KnowledgeSharingPlatform.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PictureUrl { get; set; } = string.Empty;
        public string Role { get; set; } = "Faculty";
        public DateTime LastLogin { get; set; }
    }
}
