using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
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

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var topic = await _context.Topics.Include(x => x.Options).FirstOrDefaultAsync(x => x.Id == request.Topic.Id);

            if (topic == null) return null;

            var optionsToRemove = topic.Options;

            _context.Options.RemoveRange(optionsToRemove);

            _mapper.Map(request.Topic, topic);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update activity");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
