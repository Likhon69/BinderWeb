using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.DataServices.SystemAdmin.DataServices;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderCore.Services.SystemAdmin.Services;
using CommonUnitOfWork;

using BinderCore.DataServices.Contracts.SystemAdmin;
using BinderCore.DataServices.Repositories.SystemAdmin;
using Binder.NotificationService.Contracts;
using BinderCore.DataServices.Contracts.Notification;
using Binder.NotificationService.Services;
using BinderCore.DataServices.Repositories.Notification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using BinderCoreApi.Configuration;

namespace BinderCoreApi
{
    public class Startup
    {
        //  IUsersRepository _repository;
        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;
            // _repository = repository;
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Core API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement() { });
            });
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.  
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            //services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    x.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(x =>
            //{
            //    //x.Audience = "http://localhost:34023/";
            //    //x.Authority = "http://localhost:2738/";
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(key),
            //        ValidateIssuer = true,
            //        ValidateAudience = true,

            //    };
            //})
            // .AddCookie();

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

            services.AddControllers();



            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IMenuRepository, MenuRepository>();
            services.AddTransient<IMenuService, MenuService>();

            services.AddTransient<IGroupRepository, GroupRepository>();
            services.AddTransient<IGroupServices, GroupServices>();
            services.AddTransient<IGroupMemberRepository, GroupMemberRepository>();
            services.AddTransient<IGroupMemberServices, GroupMemberServices>();

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
                    .AllowAnyHeader()
                );

                //.WithOrigins("http://localhost:34023")

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
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Binder Core API v1");
            });

            app.UseCookiePolicy();
            //app.UseHttpsRedirection();
            app.Use(async (context, next) =>
            {
                var JWToken = context.Request.Cookies["LoginCookie"];
                if (!string.IsNullOrEmpty(JWToken))
                {
                    context.Request.Headers.Add("Authorization", "Bearer " + JWToken);
                }
                await next();
            });

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
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
