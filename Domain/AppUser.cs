using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ImageUrl { get; set; }
    public List<Topic> Topics { get; set; }
    public List<UserOption> Votes { get; set; }
    public List<Comment> Comments { get; set; }
}
