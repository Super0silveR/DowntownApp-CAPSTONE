using Api.Installers.Interfaces;
using Application;

namespace Api.Installers.Implementations
{
    public class DependencyInjectionInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();

            // Custom
            services.AddApplication();

            // TODO
            //services.AddInfrastructure();
            //services.AddPersistence();
        }
    }
}
