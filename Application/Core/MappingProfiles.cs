using Application.Options;
using Application.Topics;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<Topic, Topic>();
        CreateMap<Option, OptionDto>();
        CreateMap<Topic, TopicDto>();
    }
}
