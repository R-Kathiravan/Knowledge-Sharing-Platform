namespace KnowledgeSharingPlatform.Api.Models
{
    public class EventModel
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public string Organized_By { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        public string Keywords { get; set; }
        public string status { get; set; }
        public int User_Id { get; set; }

    }
}
