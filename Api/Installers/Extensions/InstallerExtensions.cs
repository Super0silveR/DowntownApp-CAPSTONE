using Api.Installers.Interfaces;

namespace Api.Installers.Extensions
{
    public static class InstallerExtensions
    {
        public static void InstallerServicesInAssembly(this IServiceCollection services, IConfiguration configuration)
        {
            typeof(Program).Assembly.ExportedTypes
                .Where(x => typeof(IInstaller).IsAssignableFrom(x) && !x.IsAbstract && !x.IsInterface)
                .Select(Activator.CreateInstance).Cast<IInstaller>()
                .ToList()
                .ForEach(installer => installer.InstallServices(services, configuration));
        }
    }
}
