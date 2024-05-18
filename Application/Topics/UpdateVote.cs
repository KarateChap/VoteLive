using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application;

public class UpdateVote
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var option = await _context.Options
                .Include(v => v.Voters).ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (option == null) return null;

            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var voter = option.Voters.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

            if (option.Voters.Any(x => x.AppUser == user))
            {
                option.Voters.Remove(voter);
            }

            else
            {
                voter = new Domain.UserOption
                {
                    AppUser = user,
                    Option = option,
                };
                option.Voters.Add(voter);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating vote");
        }
    }
}
