using Application.Comments;
using Application.Options;
using Application.Topics;
using Application.Users;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<Topic, Topic>();
        CreateMap<Option, OptionDto>();
        CreateMap<AppUser, UserDto>();
        CreateMap<Topic, TopicDto>()
            .ForMember(d => d.Creator, o => o.MapFrom(s => s.AppUser))
            .ForMember(d => d.Options, o => o.MapFrom(s => s.Options));
        CreateMap<Option, OptionDto>()
            .ForMember(d => d.Voters, o => o.MapFrom(s => s.Voters.Select(vo => vo.AppUser)));
        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.FirstName, o => o.MapFrom(s => s.Author.FirstName))
            .ForMember(d => d.LastName, o => o.MapFrom(s => s.Author.LastName))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.Author.ImageUrl));
    }
}
