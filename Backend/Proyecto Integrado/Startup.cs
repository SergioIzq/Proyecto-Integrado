using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using NHibernate;
using Proyecto_Integrado.Services;
using NHibernate.Cfg;
using System.Reflection;

public class Startup
{

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        var refreshInterval = TimeSpan.FromSeconds(30); 

        services.AddSingleton<IDataLoadingService, DataLoadingService>(provider =>
        {
            var serviceScopeFactory = provider.GetRequiredService<IServiceScopeFactory>();
            return new DataLoadingService(serviceScopeFactory, refreshInterval);
        });

        // Registrar DataLoadingService como un servicio hospedado
        services.AddSingleton<IHostedService>(provider => (IHostedService)provider.GetRequiredService<IDataLoadingService>());

        services.AddCors(options =>
        {
            options.AddPolicy("AllowOrigin",
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
        });

        var sessionFactory = ConfigureNHibernate(Configuration);
        services.AddSingleton<ISessionFactory>(sessionFactory);

        var jwtConfiguration = Configuration.GetSection("Jwt");
        var secretKey = Encoding.UTF8.GetBytes(jwtConfiguration["SecretKey"]);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfiguration["Issuer"],
                    ValidAudience = jwtConfiguration["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(secretKey)
                };
            });

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();        
        services.AddControllers();

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app)
    {


        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors("AllowOrigin");
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

    private ISessionFactory ConfigureNHibernate(IConfiguration configuration)
    {        
        var cfg = new Configuration();
        cfg.Configure("NHibernate/hibernate.cfg.xml");
        cfg.AddAssembly(Assembly.GetCallingAssembly());
        return cfg.BuildSessionFactory();
    }
}



