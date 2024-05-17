using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class List
{
    public class Query : IRequest<Result<List<TopicDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<TopicDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<TopicDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            return Result<List<TopicDto>>.Success(await _context.Topics.ProjectTo<TopicDto>(_mapper.ConfigurationProvider).ToListAsync());
        }
    }
}
