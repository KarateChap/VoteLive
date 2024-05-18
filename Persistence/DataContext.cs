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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Option>()
            .HasOne(o => o.Topic)
            .WithMany(t => t.Options)
            .HasForeignKey(o => o.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
