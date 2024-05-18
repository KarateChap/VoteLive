namespace Domain;

public class Topic
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string TopicDescription { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<Option> Options { get; set; }
    public AppUser AppUser { get; set; }

}
