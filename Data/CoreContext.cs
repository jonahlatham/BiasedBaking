using System;

using biasedBaking.Data.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace biasedBaking.Data
{
    public partial class CoreContext : DbContext
    {
        public CoreContext () { }

        public CoreContext (DbContextOptions<CoreContext> options) : base (options) { }

        public virtual DbSet<Election> Election { get; set; }
        public virtual DbSet<Pie> Pie { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Vote> Vote { get; set; }

        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql ("Host=ec2-34-200-106-49.compute-1.amazonaws.com;Database=d2emfus115te9i;Username=etdafyzknhybmf;Password=d4b4efc01535dc1eaa324c59d03f5cfe7af7e99007953cad70c4ceac0fd916dc");
            }
        }

        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Election> (entity =>
            {
                entity.Property (e => e.Id);
                entity.Property (e => e.Description);
                entity.Property (e => e.StartDate);
                entity.Property (e => e.EndDate);
                entity.Property (e => e.IsActive);
            });

            modelBuilder.Entity<Pie> (entity =>
            {
                entity.Property (e => e.Id);
                entity.Property (e => e.Name);
                entity.Property (e => e.UserId);
                entity.HasOne (e => e.User);
                entity.HasMany (e => e.Votes);
            });

            modelBuilder.Entity<User> (entity =>
            {
                entity.Property (e => e.Id);
                entity.Property (e => e.Name);
            });

            modelBuilder.Entity<Vote> (entity =>
            {
                entity.Property (e => e.Id);
                entity.Property (e => e.UserId);
                entity.Property (e => e.PieId);
                entity.Property (e => e.ElectionId);
                entity.HasOne (e => e.User);
            });

            OnModelCreatingPartial (modelBuilder);
        }

        partial void OnModelCreatingPartial (ModelBuilder modelBuilder);
    }
}