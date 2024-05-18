using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsTopicOwnerRequirement : IAuthorizationRequirement
{

}

public class IsTopicOwnerRequirementHandler : AuthorizationHandler<IsTopicOwnerRequirement>
{
    private readonly DataContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public IsTopicOwnerRequirementHandler(DataContext dbContext,
        IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsTopicOwnerRequirement requirement)
    {
        var username = context.User.FindFirstValue(ClaimTypes.Name);

        if (username == null) return Task.CompletedTask;

        var topicId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
            .SingleOrDefault(x => x.Key == "id").Value?.ToString());

        var topic = _dbContext.Topics.Include(x => x.AppUser).AsNoTracking().FirstOrDefault(x => x.Id == topicId);

        if (topic == null) return Task.CompletedTask;

        if (topic.AppUser.UserName == username) context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
