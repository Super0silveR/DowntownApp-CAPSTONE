namespace ApplicationTests.Data
{
    /// <summary>
    /// This class has no code, and is never created. Its purpose is simply
    /// to be the place to apply [CollectionDefinition] and all the ICollectionFixture<> interfaces.
    /// </summary>
    [CollectionDefinition("db_fixture_collection")]
    public class WriteDatabaseCollection : ICollectionFixture<DatabaseFixture>
    {
    }
}
