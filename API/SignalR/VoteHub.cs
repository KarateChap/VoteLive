using Application.Topics;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class VoteHub : Hub
{
    private readonly IMediator _mediator;

    public VoteHub(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task UpdateVote(UpdateVote.Command command)
    {
        var topic = await _mediator.Send(command);

        await Clients.Group(command.TopicId.ToString())
            .SendAsync("ReceiveVote", topic.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();

        var topicId = httpContext.Request.Query["topicId"];

        await Groups.AddToGroupAsync(Context.ConnectionId, topicId);

        var result = await _mediator.Send(new Details.Query { Id = Guid.Parse(topicId) });

        await Clients.Caller.SendAsync("LoadTopic", result.Value);
    }
}
