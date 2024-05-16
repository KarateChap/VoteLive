using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Topics;

public class Edit
{
    public class Command : IRequest
    {
        public Topic Topic { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var topic = await _context.Topics.FindAsync(request.Topic.Id);

            _mapper.Map(request.Topic, topic);

            await _context.SaveChangesAsync();
        }
    }
}
