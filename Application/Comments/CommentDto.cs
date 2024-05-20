namespace Application.Comments;

public class CommentDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Body { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ImageUrl { get; set; }
}
