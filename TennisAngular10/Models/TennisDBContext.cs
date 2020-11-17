using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TennisAngular10.Models
{
    public partial class TennisDBContext : DbContext
    {
        public TennisDBContext()
        {
        }

        public TennisDBContext(DbContextOptions<TennisDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Player> Player { get; set; }
        public virtual DbSet<Ranking> Ranking { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("your connection string");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("country", "tennis2");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Code)
                    .HasColumnName("code")
                    .HasMaxLength(3)
                    .IsFixedLength();

                entity.Property(e => e.ImageLink)
                    .HasColumnName("image_link")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("player", "tennis2");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.Dob)
                    .HasColumnName("dob")
                    .HasColumnType("date");

                entity.Property(e => e.Gender).HasColumnName("gender");

                entity.Property(e => e.Handed).HasColumnName("handed");

                entity.Property(e => e.HeightFeet).HasColumnName("height_feet");

                entity.Property(e => e.HeightInches).HasColumnName("height_inches");

                entity.Property(e => e.HomeTown)
                    .HasColumnName("home_town")
                    .HasMaxLength(30);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(30);

                entity.Property(e => e.Photo).HasColumnName("photo");

                entity.Property(e => e.TurnedPro).HasColumnName("turned_pro");

                entity.Property(e => e.Weight).HasColumnName("weight");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Player)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("player_country_id_fkey");
            });

            modelBuilder.Entity<Ranking>(entity =>
            {
                entity.ToTable("ranking", "tennis2");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DoublesTitles).HasColumnName("doubles_titles");

                entity.Property(e => e.Movement).HasColumnName("movement");

                entity.Property(e => e.PlayerId).HasColumnName("player_id");

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.PrizeMoney).HasColumnName("prize_money");

                entity.Property(e => e.Rank).HasColumnName("rank");

                entity.Property(e => e.SinglesLoss).HasColumnName("singles_loss");

                entity.Property(e => e.SinglesTitles).HasColumnName("singles_titles");

                entity.Property(e => e.SinglesWin).HasColumnName("singles_win");

                entity.Property(e => e.Year).HasColumnName("year");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.Ranking)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("ranking_player_id_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
