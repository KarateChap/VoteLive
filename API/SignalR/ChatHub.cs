﻿using Application;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class ChatHub : Hub
{
    private readonly IMediator _mediator;

    public ChatHub(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task SendComment(Create.Command command)
    {
        var comment = await _mediator.Send(command);

        await Clients.Group(command.TopicId.ToString())
            .SendAsync("ReceiveComment", comment.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();

        var topicId = httpContext.Request.Query["topicId"];

        await Groups.AddToGroupAsync(Context.ConnectionId, topicId);

        var result = await _mediator.Send(new List.Query { TopicId = Guid.Parse(topicId) });

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}
