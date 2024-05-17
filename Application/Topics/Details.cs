using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Details
{
    public class Query : IRequest<Result<TopicDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<TopicDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<TopicDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var topic = await _context.Topics.ProjectTo<TopicDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Id);
            return Result<TopicDto>.Success(topic);
        }
    }
}
