namespace Domain;

public class UserOption
{
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public Guid OptionId { get; set; }
    public Option Option { get; set; }
}
