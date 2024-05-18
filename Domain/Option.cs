namespace Domain;

public class Option
{
    public Guid Id { get; set; }
    public string OptionDescription { get; set; }
    public Guid TopicId { get; set; }
    public Topic Topic { get; set; }
    public List<UserOption> Voters { get; set; }
}
