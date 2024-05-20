using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users;

public class Edit
{
    public class Command : IRequest<Result<UserDto>>
    {
        public IFormFile File { get; set; }
    }
    public class Handler : IRequestHandler<Command, Result<UserDto>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IPhotoAccessor photoAccessor,
            IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

            user.ImageUrl = photoUploadResult.Url;

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Result<UserDto>.Success(_mapper.Map<UserDto>(user));

            return Result<UserDto>.Failure("Problem editing the user");
        }
    }
}
