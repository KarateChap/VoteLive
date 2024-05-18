using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Create
{
    public class Command : IRequest<Result<TopicDto>>
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
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

            var topic = request.Topic;

            topic.AppUser = user;

            _context.Add(topic);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<TopicDto>.Failure("Failed to create the topic");

            return Result<TopicDto>.Success(_mapper.Map<TopicDto>(topic));
        }
    }
}
