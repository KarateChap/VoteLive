using Domain;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (context.Topics.Any()) return;

        var topics = new List<Topic>
        {
            new Topic
            {
                Title = "Who is the most handsome?",
                TopicDescription = "Choose the most handsome among these choices",
                IsCompleted = false,
                IsMultiVote = false,
                CreatedAt = DateTime.UtcNow,
                Options = [
                    new Option {
                    OptionDescription = "Ralph Gabriel Mariano",
                    },
                    new Option {
                    OptionDescription = "Johhny Bravo"
                    },
                     new Option {
                    OptionDescription = "Jose Rizal"
                    }
                ]
            },
            new Topic
            {
                Title = "Who is the most Beautiful?",
                TopicDescription = "Choose the most beautiful among these choices",
                IsCompleted = false,
                IsMultiVote = false,
                CreatedAt = DateTime.UtcNow,
                Options = [
                    new Option {
                    OptionDescription = "Ada Lovelace",
                    },
                    new Option {
                    OptionDescription = "Mel Tiangco"
                    },
                     new Option {
                    OptionDescription = "Nikky Minadge"
                    }
                ]
            }
        };

        await context.Topics.AddRangeAsync(topics);
        await context.SaveChangesAsync();
    }
}
