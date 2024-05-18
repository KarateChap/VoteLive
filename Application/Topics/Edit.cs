using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Edit
{
    public class Command : IRequest<Result<TopicDto
    >>
    {
        public Topic Topic { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Topic).SetValidator(new TopicValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<TopicDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<TopicDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var topic = await _context.Topics.Include(x => x.Options).FirstOrDefaultAsync(x => x.Id == request.Topic.Id);

            if (topic == null) return null;

            var optionsToRemove = topic.Options;

            _context.Options.RemoveRange(optionsToRemove);

            _mapper.Map(request.Topic, topic);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<TopicDto>.Failure("Failed to update activity");

            return Result<TopicDto>.Success(await _context.Topics.ProjectTo<TopicDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Topic.Id));
        }
    }
}
