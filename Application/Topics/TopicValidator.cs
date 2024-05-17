using Domain;
using FluentValidation;

namespace Application.Topics;

public class TopicValidator : AbstractValidator<Topic>
{
    public TopicValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.TopicDescription).NotEmpty();
    }
}
