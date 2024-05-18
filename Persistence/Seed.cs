using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {

        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new AppUser{UserName = "Bob", FirstName = "Bob", LastName = "Builder", Email = "bob@test.com", ImageUrl = ""},
                new AppUser{UserName = "Tom", FirstName = "Tom", LastName = "Felter", Email = "tom@test.com", ImageUrl = ""},
                new AppUser{UserName = "Jane", FirstName = "Jane", LastName = "Doe", Email = "jane@test.com", ImageUrl = ""},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            if (context.Topics.Any()) return;

            var topics = new List<Topic>
        {
            new Topic
            {
                Title = "Who is the most handsome?",
                TopicDescription = "Choose the most handsome among these choices",

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
                ],
                AppUser = users[0]
            },
            new Topic
            {
                Title = "Who is the most Beautiful?",
                TopicDescription = "Choose the most beautiful among these choices",

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
                ],
                AppUser = users[1]
            }

        };
            await context.Topics.AddRangeAsync(topics);
        }

        await context.SaveChangesAsync();
    }
}
