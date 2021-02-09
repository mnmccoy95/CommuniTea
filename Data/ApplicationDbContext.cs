using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CommuniTea.Models;

namespace CommuniTea.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Post> Post { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<PostTag> PostTag { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Answer> Answer { get; set; }
        public DbSet<QuestionType> QuestionType { get; set; }
        public DbSet<Inspiration> Inspiration { get; set; }
        public DbSet<Sub> Subs { get; set; }
        public DbSet<Comment> Comment { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sub>()
                .HasOne(s => s.SubscriberUserProfile)
                .WithMany(up => up.Sub)
                .HasForeignKey(s => s.SubscriberUserProfileId);
        }
    }
}
