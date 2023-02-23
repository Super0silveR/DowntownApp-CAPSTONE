using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Drawing;

namespace Persistence
{
    public class DataContextInitializer
    {
        private readonly IColorService _colorService;
        private readonly ILogger<DataContextInitializer> _logger;
        private readonly DataContext _context;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;

        public DataContextInitializer(IColorService colorService,
                                      ILogger<DataContextInitializer> logger,
                                      DataContext context,
                                      RoleManager<Role> roleManager,
                                      UserManager<User> userManager)
        {
            _colorService = colorService;
            _logger = logger;
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task InitializeAsync()
        {
            try
            {
                if (_context.Database.IsSqlite() || _context.Database.IsNpgsql())
                {
                    await _context.Database.EnsureCreatedAsync();
                    //await _context.Database.MigrateAsync();
                }
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

            var eventCategories = new List<EventCategory>
            {
                new EventCategory
                {
                    Title = "Music",
                    Description = "Awesome music at this event!",
                    Color = _colorService.RgbConverter(Color.Coral)
                },
                new EventCategory
                {
                    Title = "Art",
                    Description = "Awesome art at this event!",
                    Color = _colorService.RgbConverter(Color.Honeydew)
                },
                new EventCategory
                {
                    Title = "Dating",
                    Description = "Awesome dating at this event!",
                    Color = _colorService.RgbConverter(Color.Indigo)
                },
            };

            var eventTypes = new List<EventType>
            {
                new EventType { Title = "Speed Dating", Color = _colorService.RgbConverter(Color.DeepPink) },
                new EventType { Title = "Local Artists", Color = _colorService.RgbConverter(Color.LightGoldenrodYellow) },
                new EventType { Title = "Music Artists", Color = _colorService.RgbConverter(Color.MediumOrchid) }
            };

            await _context.EventCategories.AddRangeAsync(eventCategories);
            await _context.EventTypes.AddRangeAsync(eventTypes);
            await _context.SaveChangesAsync();

            var users = new List<User>
            {
                new User { DisplayName = "Hephaestots", UserName = "vince", Email = "vinc@test.com" },
                new User { DisplayName = "SilveR", UserName = "elias", Email = "elias@test.com" },
                new User { DisplayName = "Nabil", UserName = "nabil", Email = "nabil@test.com" },
                new User { DisplayName = "Venomyox", UserName = "younes", Email = "younes@test.com" }
            };

            if (!_roleManager.Roles.Any(role => role.Name == adminRole.Name))
            {
                await _roleManager.CreateAsync(adminRole);
                await _context.SaveChangesAsync();
            }

            if (!_userManager.Users.Any())
            {
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
                    CreatorId = users[0].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Past Event 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Event 2 months ago",
                    City = "London",
                    Venue = "Pub"
                },
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[1].Id,
                    EventTypeId = eventTypes[1].Id,
                    Title = "Past Event 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Event 1 month ago",
                    City = "Paris",
                    Venue = "Louvre"
                },
                new Event
                {
                    CreatorId = users[2].Id,
                    EventCategoryId = eventCategories[2].Id,
                    EventTypeId = eventTypes[0].Id,
                    Title = "Future Event 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 1 month in future",
                    City = "London",
                    Venue = "Natural History Museum"
                },
                new Event
                {
                    CreatorId = users[3].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Future Event 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Event 2 months in future",
                    City = "London",
                    Venue = "O2 Arena"
                },
                new Event
                {
                    CreatorId = users[0].Id,
                    EventCategoryId = eventCategories[1].Id,
                    EventTypeId = eventTypes[1].Id,
                    Title = "Future Event 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Event 3 months in future",
                    City = "London",
                    Venue = "Another pub"
                },
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[2].Id,
                    EventTypeId = eventTypes[0].Id,
                    Title = "Future Event 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Event 4 months in future",
                    City = "London",
                    Venue = "Yet another pub"
                },
                new Event
                {
                    CreatorId = users[2].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Future Event 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Event 5 months in future",
                    City = "London",
                    Venue = "Just another pub"
                },
                new Event
                {
                    CreatorId = users[3].Id,
                    EventCategoryId = eventCategories[1].Id,
                    EventTypeId = eventTypes[1].Id,
                    Title = "Future Event 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Event 6 months in future",
                    City = "London",
                    Venue = "Roundhouse Camden"
                },
                new Event
                {
                    CreatorId = users[0].Id,
                    EventCategoryId = eventCategories[2].Id,
                    EventTypeId = eventTypes[0].Id,
                    Title = "Future Event 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Event 2 months ago",
                    City = "London",
                    Venue = "Somewhere on the Thames"
                },
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Future Event 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Event 8 months in future",
                    City = "London",
                    Venue = "Cinema"
                }
            };

            await _context.Events.AddRangeAsync(events);
            await _context.SaveChangesAsync();
        }
    }
}
