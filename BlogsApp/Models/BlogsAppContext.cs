using Microsoft.EntityFrameworkCore;

namespace BlogsApp.Models
{
    public class BlogsAppContext : DbContext
    {
        public virtual DbSet<Publication> Publications { get; set; }
        public virtual DbSet<Category> Categories { get; set; }

        public BlogsAppContext(DbContextOptions<BlogsAppContext> options)
            :base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Publication>(entity =>
            {
                entity.HasOne(e => e.Category)
                .WithMany(e => e.Publications)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
            });
        }

    }
}
