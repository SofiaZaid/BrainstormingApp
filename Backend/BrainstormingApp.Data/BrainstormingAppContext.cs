using BrainstormingApp.Domain;
using Microsoft.EntityFrameworkCore;

namespace BrainstormingApp.Data
{
    public class BrainstormingAppContext : DbContext
    {
        public DbSet<Message> Messages { get; set; }

        public DbSet<BrainstormingRoom> Rooms { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .EnableSensitiveDataLogging()
                .UseSqlServer("Server = (localdb)\\mssqllocaldb; Database = BrainstormingAppDb; Trusted_Connection = True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Message>()
                .Property(m => m.MessageCreated)
                .HasDefaultValueSql("getdate()");
        }
    }
}