using Application.Options;

namespace Application.Topics;

public class TopicDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string TopicDescription { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsMultiVote { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OptionDto> Options { get; set; }
}
