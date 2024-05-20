using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class UpdateVote
{
    public class Command : IRequest<Result<TopicDto>>
    {
        public Guid OptionId { get; set; }
        public Guid TopicId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<TopicDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<TopicDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userAccessors = _userAccessor.GetUsername();

            var user = await _context.Users.SingleOrDefaultAsync(x =>
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

            await _context.SaveChangesAsync();

            return Result<TopicDto>.Success(await _context.Topics
                .ProjectTo<TopicDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.TopicId));
        }
    }
}
