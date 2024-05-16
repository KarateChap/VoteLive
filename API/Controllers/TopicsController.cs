using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API;

public class TopicsController : BaseApiController
{
    private readonly DataContext _context;

    public TopicsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Topic>>> getTopics()
    {
        return await _context.Topics.Include(x => x.Options).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Topic>> getTopic()
    {
        return await _context.Topics.Include(x => x.Options).FirstOrDefaultAsync();
    }
}
