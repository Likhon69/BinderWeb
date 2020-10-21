using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Repository.BinderWebRepositories;
using BinderWeb.Services.BinderWebContracts;
using BinderWeb.Services.BinderWebServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BinderWeb.DatabaseContext.Entities;
using Microsoft.Extensions.Logging;
using BinderUtility;
using AutoMapper;

using Swashbuckle.AspNetCore.Swagger;
using Newtonsoft.Json.Serialization;
using Microsoft.OpenApi.Models;
using BinderWeb.Models;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BinderWeb.Services.BinderContractsWeb;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.BinderServicesWeb;
using BinderWeb.Repository.BinderRepositoriesWeb;
using CommonUnitOfWork;
using Microsoft.AspNetCore.Authorization;
using BinderWebApi.Models;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.DataServices.SystemAdmin.DataServices;
using BinderCore.Services.SystemAdmin.Services;
using Binder.NotificationService.Contracts;
using BinderCore.DataServices.Contracts.Notification;
using Binder.NotificationService.Services;
using BinderCore.DataServices.Repositories.Notification;
using BinderWebApi.Configuration;

namespace BinderWebApi
{
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
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });
            services.AddMvc()
                .AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.PropertyNamingPolicy = null;
                o.JsonSerializerOptions.DictionaryKeyPolicy = null;
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Binder Web API", Version = "v1" });
            });
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);


            services.AddAuthentication("OAuth")
             .AddJwtBearer("OAuth", config =>
             {
                 var secretBytes = Encoding.UTF8.GetBytes(appSettings.Secret);
                 var key = new SymmetricSecurityKey(secretBytes);

                 config.Events = new JwtBearerEvents()
                 {
                     OnMessageReceived = context =>
                     {
                         if (context.Request.Query.ContainsKey("access_token"))
                         {
                             context.Token = context.Request.Query["access_token"];
                             context.Request.Headers.Add("Authorization", "Bearer " + context.Token);
                         }

                         return Task.CompletedTask;
                     }
                 };

                 config.TokenValidationParameters = new TokenValidationParameters()
                 {
                     ClockSkew = TimeSpan.Zero,
                     ValidIssuer = appSettings.Issuer,
                     ValidAudience = appSettings.Audiance,
                     IssuerSigningKey = key,
                 };
             });

            services.AddAuthorization(config =>
            {
                var defaultAuthBuilder = new AuthorizationPolicyBuilder();
                var defaultAuthPolicy = defaultAuthBuilder
                    .AddRequirements(new JwtRequirement())
                    .Build();

                config.DefaultPolicy = defaultAuthPolicy;
            });
            services.AddScoped<IAuthorizationHandler, JwtRequirementHandler>();
            services.AddHttpClient()
             .AddHttpContextAccessor();

            services.AddSingleton<IAuthorizationHandler,
                   MinimumExpHandler>();
            /*    services.AddSingleton<IAuthorizationHandler,
                   MinimumExpHandler>();*/

            services.AddTransient<IProductInformationServices, ProductInformationServices>();
            services.AddTransient<IProductInformationRepository, ProductInformationRepository>();

            services.AddTransient<IUnitServices, UnitServices>();
            services.AddTransient<IUnitRepository, UnitRepository>();
            services.AddTransient<IDateProductPriceServices, DateProductPriceServices>();
            services.AddTransient<IDateProductPriceRepository, DateProductPriceRepository>();
            services.AddTransient<IAddDateProductPriceServices, AddDateProductPriceServices>();
            services.AddTransient<IAddDateProductPriceRepository, AddDateProductPriceRepository>();
            services.AddTransient<IDateProductPriceApproveUnApproveServices, DateProductPriceApproveUnApproveServices>();
            services.AddTransient<IDateProductPriceApproveUnApproveRepository, DateProductPriceApproveUnApproveRepository>();
            services.AddTransient<IAddDateProductPriceApproveServices, AddDateProductPriceApproveServices>();

            services.AddTransient<IAddProductPriceHistoryRepository, AddProductPriceHistoryRepository>();
            services.AddTransient<IProductPriceServices, ProductPriceServices>();
            services.AddTransient<IProductPriceRepository, ProductPriceRepository>();
            services.AddTransient<IOrderPaymentHistoryServices, OrderPaymentHistoryServices>();
            services.AddTransient<IOrderPaymentHistoryRepository, OrderPaymentHistoryRepository>();
            services.AddTransient<IDealerInformationServices, DealerInformationServices>();
            services.AddTransient<IDealerInformationRepository, DealerInformationRepository>();
            services.AddTransient<IDealerTypeServices, DealerTypeServices>();
            services.AddTransient<IDealerTypeRepository, DealerTypeRepository>();
            services.AddTransient<ILocationServices, LocationServices>();
            services.AddTransient<ILocationRepository, LocationRepository>();
            services.AddTransient<IDealerWithLocationMappingRepository, DealerWithLocationMappingRepository>();
            services.AddTransient<ITallySearchServices, TallySearchServices>();
            services.AddTransient<ITallySearchRepository, TallySearchRepository>();
            services.AddTransient<IOrderRequestServices, OrderRequestServices>();
            services.AddTransient<IOrderRequestRepository, OrderRequestRepository>();
            services.AddTransient<IAddDateProductPriceApproveRepository, AddDateProductPriceApproveRepository>();
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IOrderNotificationService, OrderNotificationService>();
            services.AddTransient<IUserNotificationService, UserNotificationService>();
            services.AddTransient<IEmailContentRepository, EmailContentRepository>();
            services.AddTransient<IEmailRepository, EmailRepository>();
            services.AddTransient<IMessageRepository, MessageRepository>();
            services.AddTransient<ISmsRepository, SmsRepository>();


            services.AddTransient<ICommonConnection, CommonConnection>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();




            services.AddTransient<DbContext, BinderDBContext>();
            services.AddDbContext<BinderDBContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(Configuration["ConnectionStrings:SqlConnectionString"]);
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());

            });

            services.AddAutoMapper(typeof(Startup));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Binder API v1");
            });

            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                //endpoints.MapControllerRoute(
                //  name: "default",
                //  pattern: "{controller=Home}/{action=Index}/{id?}");
            });




            var builder = new ConfigurationBuilder()
           .SetBasePath(env.ContentRootPath)
           .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
             .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
           .AddEnvironmentVariables();


            // Enable middleware to serve generated Swagger as a JSON endpoint.

            builder.Build();
        }
    }
}
