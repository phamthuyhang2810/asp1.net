using Microsoft.EntityFrameworkCore;
using PhamThuyhang_2122110351.Model;
using PhamThuyhang_2122110351.Models;


namespace PhamThuyhang_2122110351.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

    }
}

