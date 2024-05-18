namespace API.DTOs;

public class UpdateVoteDto
{
    public Guid TopicId { get; set; }
    public Guid OptionId { get; set; }
}
