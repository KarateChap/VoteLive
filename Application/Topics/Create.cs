using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
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

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<TopicDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            _context.Add(request.Topic);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<TopicDto>.Failure("Failed to create the topic");

            return Result<TopicDto>.Success(_mapper.Map<TopicDto>(request.Topic));
        }
    }
}
