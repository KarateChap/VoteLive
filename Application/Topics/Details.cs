using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Details
{
    public class Query : IRequest<TopicDto>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, TopicDto>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TopicDto> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Topics.ProjectTo<TopicDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Id);
        }
    }
}
