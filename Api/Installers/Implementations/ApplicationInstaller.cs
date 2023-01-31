using Api.Installers.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Installers.Implementations
{
    public class ApplicationInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                var conStr = configuration.GetConnectionString("DefaultConnection");
                opt.UseNpgsql(conStr);
            });
       }
    }
}
