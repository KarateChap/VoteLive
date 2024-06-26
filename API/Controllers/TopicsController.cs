﻿using API.DTOs;
using Application.Topics;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class TopicsController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetTopics()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTopic(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<TopicDto>> CreateTopic(Topic topic)
    {
        return HandleResult(await Mediator.Send(new Create.Command { Topic = topic }));
    }

    [Authorize(Policy = "IsTopicOwner")]
    [HttpPut("{id}")]
    public async Task<ActionResult<TopicDto>> EditTopic(Guid id, Topic topic)
    {
        topic.Id = id;

        return HandleResult(await Mediator.Send(new Edit.Command { Topic = topic }));
    }

    [Authorize(Policy = "IsTopicOwner")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTopic(Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }


    [HttpPost("update-vote")]
    public async Task<IActionResult> UpdateVote(UpdateVoteDto updateVoteDto)
    {
        return HandleResult(await Mediator.Send(new UpdateVote.Command { OptionId = updateVoteDto.OptionId, TopicId = updateVoteDto.TopicId }));
    }
}
