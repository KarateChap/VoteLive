using Application;
using Application.Topics;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class TopicsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<TopicDto>>> GetTopics()
    {
        return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TopicDto>> GetTopic(Guid id)
    {
        return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateTopic(Topic topic)
    {
        await Mediator.Send(new Create.Command { Topic = topic });

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditTopic(Guid id, Topic topic)
    {
        topic.Id = id;

        await Mediator.Send(new Edit.Command { Topic = topic });

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTopic(Guid id)
    {
        await Mediator.Send(new Delete.Command { Id = id });

        return Ok();
    }
}
