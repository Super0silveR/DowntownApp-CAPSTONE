using Ardalis.GuardClauses;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Persistence
{
    public class DataContextInitializer
    {
        private readonly ILogger<DataContextInitializer> _logger;
        private readonly DataContext _context;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;

        public DataContextInitializer(ILogger<DataContextInitializer> logger,
                                      DataContext context,
                                      RoleManager<Role> roleManager,
                                      UserManager<User> userManager)
        {
            _logger = logger;
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task InitializeAsync()
        {
            try
            {
                if (_context.Database.IsSqlite())
                    await _context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while initializing the Sqlite Database.");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while seeding the Database.");
                throw;
            }
        }

        public async Task TrySeedAsync()
        {
            Guard.Against.Null(_context.Events, nameof(_context.Events));

            var adminRole = new Role { Name = "admin" };

            if (!_roleManager.Roles.Any(role => role.Name == adminRole.Name))
            {
                await _roleManager.CreateAsync(adminRole);
                await _context.SaveChangesAsync();
            }

            if (!_userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User { DisplayName = "Hephaestots", UserName = "vince", Email = "vinc@test.com" },
                    new User { DisplayName = "SilveR", UserName = "elias", Email = "elias@test.com" },
                    new User { DisplayName = "Nabil", UserName = "nabil", Email = "nabil@test.com" },
                    new User { DisplayName = "Venomyox", UserName = "younes", Email = "younes@test.com" }
                };

                foreach (var user in users)
                {
                    await _userManager.CreateAsync(user, "Pa$$w0rd");
                    await _userManager.AddToRoleAsync(user, adminRole.Name);
                }
            }

            if (_context.Events.Any()) return;

            var events = new List<Event>
            {
                new Event
                {
                    Title = "Past Event 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Event 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Event
                {
                    Title = "Past Event 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Event 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Event
                {
                    Title = "Future Event 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Event
                {
                    Title = "Future Event 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Event 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Event
                {
                    Title = "Future Event 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Event 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Event
                {
                    Title = "Future Event 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Event 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Event
                {
                    Title = "Future Event 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Event 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Event
                {
                    Title = "Future Event 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Event 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Event
                {
                    Title = "Future Event 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Event 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Event
                {
                    Title = "Future Event 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Event 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };

            await _context.Events.AddRangeAsync(events);
            await _context.SaveChangesAsync();
        }
    }
}
