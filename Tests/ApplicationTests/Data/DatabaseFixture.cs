using Application.Common.Interfaces;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;
using Persistence.Interceptors;

namespace ApplicationTests.Data
{
    /// <summary>
    /// Database fixture used for "centralizing" the "test context" used during the test suite's execution.
    /// 
    /// Per XUnit Doc, we want to use this pattern : "when you want to create a single test context and share it among all the tests in the class, 
    /// and have it cleaned up after all the tests in the class have finished."
    /// </summary>
    public class DatabaseFixture
    {
        /// Connection string SPECIFIC to an Sqlite database.
        private const string ConnectionString = "Data Source=downtown-app.db";
        private const string NpgsqlString = "User ID=pgsadmin;Password=admin123;Host=localhost;Port=5457;Database=dtapp-test.db;Pooling=true;Include Error Detail=True;";

        private static readonly object _lock = new();
        private static bool _databaseInitialized;

        /// <summary>
        /// Since we have "interceptors" integrated into our DataContext pipeline, it <context> needs these as ctor parameters.
        /// </summary>
        private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;
        private readonly UserFollowingSaveChangesInterceptor _userFollowingSaveChangesInterceptor;

        private readonly IMapper _mapper;
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly Mock<IDateTimeService> _dateTimeService;

        private User _currentUser = new()
        {
            Email = "vinc@test.com",
            UserName = "heph",
            DisplayName = "Hephaestots"
        };

        /// <summary>
        /// Public constructor initializing the Database if it's the first seed, and returning the DataContext in either case.
        /// </summary>
        public DatabaseFixture()
        {
            lock (_lock)
            {
                MapperConfiguration configuration = new(cfg => cfg.AddProfile(new MappingProfiles()));

                _dateTimeService = new();
                _mapper = new Mapper(configuration);
                _mediatorMock = new();
                _userServiceMock = new();

                _auditableEntitySaveChangesInterceptor = new(_userServiceMock.Object, _dateTimeService.Object);
                _userFollowingSaveChangesInterceptor = new(_dateTimeService.Object);

                if (!_databaseInitialized)
                {

                    /// Seeding data must be here so the initial database seed only happens once.
                    using (var dataContext = CreateContext())
                    {
                        dataContext.Database.EnsureDeleted();
                        dataContext.Database.EnsureCreated();

                        /// Adding the "current user" to the database right away.
                        dataContext.Users.Add(_currentUser);
                        dataContext.SaveChanges();

                        dataContext.EventCategories.AddRange(
                                new EventCategory { Title = "Music", Description = "Awesome MUSIC at this event!", CreatorId = _currentUser.Id },
                                new EventCategory { Title = "Art", Description = "Awesome ART at this event!", CreatorId = _currentUser.Id }
                            );

                        dataContext.EventTypes.AddRange(
                                new EventType { Title = "Pop", Description = "Awesome POP at this event!", CreatorId = _currentUser.Id },
                                new EventType { Title = "Classical", Description = "Awesome CLASSICAL at this event!", CreatorId = _currentUser.Id }
                            );

                        dataContext.SaveChanges();

                        dataContext.Events.AddRange(
                                new Event
                                {
                                    CreatorId = _currentUser.Id,
                                    EventCategoryId = dataContext.EventCategories.First().Id,
                                    EventTypeId = dataContext.EventTypes.First().Id,
                                    Title = "Future Test Event 1",
                                    Date = DateTime.UtcNow.AddMonths(3),
                                    Description = "Event 3 months in future"
                                },
                                new Event
                                {
                                    CreatorId = _currentUser.Id,
                                    EventCategoryId = dataContext.EventCategories.First().Id,
                                    EventTypeId = dataContext.EventTypes.First().Id,
                                    Title = "Future Test Event 2",
                                    Date = DateTime.UtcNow.AddMonths(5),
                                    Description = "Event 5 months in future"
                                }
                            );

                        dataContext.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        /// <summary>
        /// Method returning an instance of the DataContext, with our Fake Database.
        /// </summary>
        /// <returns></returns>
        public DataContext CreateContext() =>
            new (
                    new DbContextOptionsBuilder<DataContext>().UseSqlite(ConnectionString).Options,
                    _mediatorMock.Object,
                    _auditableEntitySaveChangesInterceptor,
                    _userFollowingSaveChangesInterceptor
                );

        /// <summary>
        /// Properties used by the test units.
        /// </summary>
        #region Public Properties

        public User CurrentUser => _currentUser;
        public Mock<IMediator> Mediator => _mediatorMock;
        public IMapper Mapper => _mapper;
        public Mock<ICurrentUserService> UserService => _userServiceMock;
        public Mock<IDateTimeService> DateTimeService => _dateTimeService;

        #endregion
    }
}
