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
        public Guid OptionId { get; set; }
        public Guid TopicId { get; set; }
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
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var topic = await _context.Topics
                .Include(o => o.Options)
                .ThenInclude(v => v.Voters)
                .ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.TopicId);

            if (topic == null) return null;

            foreach (var option in topic.Options)
            {
                var userVote = option.Voters.FirstOrDefault(v => v.AppUserId == user.Id);
                if (userVote != null)
                {
                    option.Voters.Remove(userVote);
                }
            }

            var selectedOption = await _context.Options
                .Include(v => v.Voters).ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.OptionId);

            if (selectedOption == null) return null;

            var newVote = new Domain.UserOption
            {
                AppUser = user,
                Option = selectedOption,
            };
            selectedOption.Voters.Add(newVote);


            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating vote");
        }
    }
}
