using Application.Users;

namespace Application.Options;

public class OptionDto
{
    public Guid Id { get; set; }
    public string OptionDescription { get; set; }
    public List<UserDto> Voters { get; set; }
}
