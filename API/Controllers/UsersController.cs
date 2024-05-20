
using Application.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UsersController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> EditImage([FromForm] Edit.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }
}
