using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
                    var pendingMigrations = await _context.Database.GetPendingMigrationsAsync();

                    if (pendingMigrations.Any())
                    {
                        await _context.Database.MigrateAsync();
                        //await _context.Database.EnsureDeletedAsync();
                        //await _context.Database.EnsureCreatedAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while initializing the Database.");
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
            var adminRole = new Role { Name = "admin", NormalizedName = "ADMIN" };

            /// Users seeding.
            var users = new List<User>
            {
                new User { DisplayName = "Admin", UserName = "Admin", Email = "admin@test.com" },
                new User { DisplayName = "Hephaestots", UserName = "vince", Email = "vinc@test.com", IsContentCreator = true },
                new User { DisplayName = "SilveR", UserName = "elias", Email = "elias@test.com", IsContentCreator = true },
                new User { DisplayName = "Nabil", UserName = "nabil", Email = "nabil@test.com" },
                new User { DisplayName = "Venomyox", UserName = "younes", Email = "younes@test.com" }
            };

            /// Creating the users before anything else so that our foreign keys constraints are respected when building the database.
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

                    if (user.UserName.Equals("nabil")) continue;

                    await _userManager.AddToRoleAsync(user, adminRole.Name);
                }
                await _context.SaveChangesAsync();
            }

            /// Bar seeding.
            var bars = new List<Bar>
            {
                new Bar
                {
                    CoverCost = 0,
                    Creator = users[1],
                    Description = "Bar for testing attendees and profile cards.",
                    IsActive = true,
                    Title = "Hephaestots' Bar!"
                }
            };

            if (!_context.Bars.Any())
            {
                await _context.Bars.AddRangeAsync(bars);
                await _context.SaveChangesAsync();
            }

            /// Challenge Types seeding.
            var challengeTypes = new List<ChallengeType>
            {
                new ChallengeType
                {
                    Name = "Challenge1",
                    Description = "Awesome challenge1!",
                    CreatorId = users[1].Id
                },
                new ChallengeType
                {
                    Name = "Challenge2",
                    Description = "Awesome challenge2!",
                    CreatorId = users[1].Id
                },
                new ChallengeType
                {
                    Name = "Challenge3",
                    Description = "Awesome challenge3!",
                    CreatorId = users[1].Id
                },
            };

            /// Chat Room Types seeding.
            var chatRoomTypes = new List<ChatRoomType>
            {
                new ChatRoomType { Name = "Private" },
                new ChatRoomType { Name = "Public" }
            };

            if (!_context.ChatRoomTypes.Any())
            {
                await _context.ChatRoomTypes.AddRangeAsync(chatRoomTypes);
                await _context.SaveChangesAsync();
            }

            /// Event Categories seeding.
            var eventCategories = new List<EventCategory>
            {
                new EventCategory
                {
                    Title = "Music",
                    Description = "Awesome music at this event!",
                    Color = _colorService.RgbConverter(Color.Coral),
                    CreatorId = users[1].Id
                },
                new EventCategory
                {
                    Title = "Art",
                    Description = "Awesome art at this event!",
                    Color = _colorService.RgbConverter(Color.Honeydew),
                    CreatorId = users[1].Id
                },
                new EventCategory
                {
                    Title = "Dating",
                    Description = "Awesome dating at this event!",
                    Color = _colorService.RgbConverter(Color.Indigo),
                    CreatorId = users[1].Id
                },
            };

            /// Event Types seeding.
            var eventTypes = new List<EventType>
            {
                new EventType
                {
                    Title = "event type 1",
                    Description = "Awesome event type1!",
                    Color = _colorService.RgbConverter(Color.Blue),
                    CreatorId = users[1].Id
                },
                new EventType
                {
                    Title = "event type 2",
                    Description = "Awesome event type2!",
                    Color = _colorService.RgbConverter(Color.Red),
                    CreatorId = users[1].Id
                },
                new EventType
                {
                    Title = "event type 3",
                    Description = "Awesome event type3!",
                    Color = _colorService.RgbConverter(Color.Green),
                    CreatorId = users[1].Id
                },
            };

            if (!_context.EventCategories.Any())
            {

                await _context.EventCategories.AddRangeAsync(eventCategories);
                await _context.SaveChangesAsync();
            }

            if (!_context.EventTypes.Any())
            {
                await _context.EventTypes.AddRangeAsync(eventTypes);
                await _context.SaveChangesAsync();
            }

            /// Event seeding.
            var events = new List<Event>
            {
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Past Event 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 2 months ago",
                    Creator = users[1]
                },
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[1].Id,
                    EventTypeId = eventTypes[1].Id,
                    Title = "Past Event 2",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Event 1 month ago",
                    Creator = users[1]
                },
                new Event
                {
                    CreatorId = users[3].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Future Event 2",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 2 months in future",
                    Creator = users[3]
                },
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[1].Id,
                    EventTypeId = eventTypes[1].Id,
                    Title = "Future Event 3",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 3 months in future",
                    Creator = users[1]
                },
                new Event
                {
                    CreatorId = users[1].Id,
                    EventCategoryId = eventCategories[2].Id,
                    EventTypeId = eventTypes[0].Id,
                    Title = "Future Event 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Event 4 months in future",
                    Creator = users[1]
                },
                new Event
                {
                    CreatorId = users[2].Id,
                    EventCategoryId = eventCategories[0].Id,
                    EventTypeId = eventTypes[2].Id,
                    Title = "Future Event 5",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Event 5 months in future",
                    Creator = users[2]
                },
                new Event
                {
                    CreatorId = users[3].Id,
                    EventCategoryId = eventCategories[1].Id,
                    EventTypeId = eventTypes[1].Id,
                    Title = "Future Event 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Event 6 months in future",
                    Creator = users[3]
                },
            };

            /// Profile Question Types seeding.
            var questionTypes = new List<QuestionType>
            {
                new QuestionType
                {
                    Name = "question1",
                    Description = "Awesome question1!",
                },
                new QuestionType
                {
                    Name = "question2",
                    Description = "Awesome question2!",
                },
                new QuestionType
                {
                    Name = "question3",
                    Description = "Awesome question3!",
                },
            };

            if (!_context.ChallengeTypes.Any())
            {
                await _context.ChallengeTypes.AddRangeAsync(challengeTypes);
                await _context.SaveChangesAsync();
            }

            if (!_context.Events.Any())
            {
                await _context.Events.AddRangeAsync(events);

                events[0].Contributors.Add(new EventContributor { Event = events[0], User = users[1], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });
                events[0].Contributors.Add(new EventContributor { Event = events[0], User = users[2], IsActive = true, Status = ContributorStatus.Accepted });
                events[0].Contributors.Add(new EventContributor { Event = events[0], User = users[3], Status = ContributorStatus.Invited });
                events[0].Contributors.Add(new EventContributor { Event = events[0], User = users[4], Status = ContributorStatus.Removed });

                events[0].Ratings.Add(new EventRating { Event = events[0], User = users[0], Vote = 5, Review = "Wow, incredible experience!" });
                events[0].Ratings.Add(new EventRating { Event = events[0], User = users[1], Vote = 4, Review = "Wow, incredible experience!" });
                events[0].Ratings.Add(new EventRating { Event = events[0], User = users[2], Vote = 3, Review = "I would certainly return!" });
                events[0].Ratings.Add(new EventRating { Event = events[0], User = users[3], Vote = 4, Review = "Wow, memorable experience!" });
                events[0].Ratings.Add(new EventRating { Event = events[0], User = users[4], Vote = 5, Review = "Wow, incredible experience!" });


                events[1].Contributors.Add(new EventContributor { Event = events[1], User = users[1], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });
                events[3].Contributors.Add(new EventContributor { Event = events[3], User = users[1], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });
                events[4].Contributors.Add(new EventContributor { Event = events[4], User = users[1], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });

                events[2].Contributors.Add(new EventContributor { Event = events[2], User = users[3], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });
                events[5].Contributors.Add(new EventContributor { Event = events[5], User = users[2], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });
                events[6].Contributors.Add(new EventContributor { Event = events[6], User = users[3], IsActive = true, IsAdmin = true, Status = ContributorStatus.Creator });

                bars[0].ScheduledEvents.Add(new ScheduledEvent
                {
                    Event = events[0],
                    Attendees = new List<EventAttendee>
                    {
                        new EventAttendee
                        {
                            Attendee = users[1]
                        },
                        new EventAttendee
                        {
                            Attendee = users[2]
                        }
                    },
                    Bar = bars[0],
                    Capacity = 50,
                    Challenges = new List<EventChallenge>(),
                    Scheduled = DateTime.UtcNow.AddDays(1)
                });

                await _context.SaveChangesAsync();
            }
        }
    }
}
