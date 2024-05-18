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
                new AppUser{UserName = "Bob", FirstName = "Bobby", LastName = "Fischer", Email = "bob@test.com", ImageUrl = ""},
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
                Title = "Preferred Mode of Commute",
                TopicDescription = "We are conducting a survey to understand the preferred modes of commute among our employees. Your input will help us plan better transportation facilities.",

                CreatedAt = DateTime.UtcNow,
                Options = [
                    new Option {
                    OptionDescription = "Public Transport (Bus/Train)",
                    },
                    new Option {
                    OptionDescription = "Personal Vehicle (Car/Bike)"
                    },
                     new Option {
                    OptionDescription = "Bicycle/Walking"
                    }
                ],
                AppUser = users[0]
            },
            new Topic
            {
                Title = "Favorite Genre of Music",
                TopicDescription = "Music is a big part of our lives, and we want to know what genre resonates most with you. Please select your favorite type of music.",

                CreatedAt = DateTime.UtcNow,
                Options = [
                    new Option {
                    OptionDescription = "Pop/Rock",
                    },
                    new Option {
                    OptionDescription = "Classical/Jazz"
                    },
                     new Option {
                    OptionDescription = "Hip-Hop/Rap"
                    }
                ],
                AppUser = users[1]
            },
            new Topic
            {
                Title = "Preferred Work Environment",
                TopicDescription = "We are looking to improve our office environment and would love to know your preference for the ideal work setting.",

                CreatedAt = DateTime.UtcNow,
                Options = [
                    new Option {
                    OptionDescription = "Open-plan Officek",
                    },
                    new Option {
                    OptionDescription = "Private Office"
                    },
                     new Option {
                    OptionDescription = "Remote Work"
                    }
                ],
                AppUser = users[2]
            }

        };
            await context.Topics.AddRangeAsync(topics);
        }

        await context.SaveChangesAsync();
    }
}
