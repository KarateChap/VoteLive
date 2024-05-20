using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Topic> Topics { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<UserOption> UserOptions { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Option>()
            .HasOne(o => o.Topic)
            .WithMany(t => t.Options)
            .HasForeignKey(o => o.TopicId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserOption>(x => x.HasKey(uo => new { uo.AppUserId, uo.OptionId }));

        builder.Entity<UserOption>()
            .HasOne(u => u.AppUser)
            .WithMany(o => o.Votes)
            .HasForeignKey(uo => uo.AppUserId);

        builder.Entity<UserOption>()
            .HasOne(u => u.Option)
            .WithMany(o => o.Voters)
            .HasForeignKey(uo => uo.OptionId);

        builder.Entity<Comment>()
            .HasOne(t => t.Topic)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Comment>()
            .HasOne(a => a.Author)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
