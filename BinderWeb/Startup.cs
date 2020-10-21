using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Binder.NotificationService.Contracts;
using Binder.NotificationService.Services;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.DataServices.SystemAdmin.DataServices;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderCore.Services.SystemAdmin.Services;
using BinderUtility;
using BinderWeb.Configure;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Repository.BinderRepositoriesWeb;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Repository.BinderWebRepositories;
using BinderWeb.Services.BinderContractsWeb;
using BinderWeb.Services.BinderServicesWeb;
using BinderWeb.Services.BinderWebContracts;
using BinderWeb.Services.BinderWebServices;
using CommonUnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace BinderWeb
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

           
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            //services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = "bearer";
            //    x.DefaultChallengeScheme = "bearer";
            //})
            //.AddJwtBearer(x =>
            //{
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(key),
            //        ValidateIssuer = false,
            //        ValidateAudience = false
            //    };
            //})
            // .AddCookie("cookieAuth", config =>
            // {
            //     config.Cookie.Name = "Binder";
            //     config.LoginPath = "/Account/Authenticate";
            //     config.EventsType = typeof(CustomCookieAuthenticationEvents);

            // });
            //services.AddScoped<CustomCookieAuthenticationEvents>();


            //services.AddSession(options =>
            //{
            //    // Set a short timeout for easy testing.
            //    options.IdleTimeout = TimeSpan.FromSeconds(10);
            //    options.Cookie.HttpOnly = true;
            //    // Make the session cookie essential
            //    options.Cookie.IsEssential = true;
            //});


            services.AddAuthentication(config => {
                // We check the cookie to confirm that we are authenticated
                config.DefaultAuthenticateScheme = "ClientCookie";
                // When we sign in we will deal out a cookie
                config.DefaultSignInScheme = "ClientCookie";
                // use this to check if we are allowed to do something.
                config.DefaultChallengeScheme = "OurServer";
            })
               .AddCookie("ClientCookie")
               .AddOAuth("OurServer", config => {
                   config.ClientId = "client_id";
                   config.ClientSecret = "client_secret";
                   config.CallbackPath = "/oauth/callback";
                   config.AuthorizationEndpoint = "http://localhost:2738/oauth/authorize";
                   config.TokenEndpoint = "http://localhost:2738/oauth/token";
                   config.SaveTokens = true;

                   config.Events = new OAuthEvents()
                   {
                       OnCreatingTicket = context =>
                       {
                           var accessToken = context.AccessToken;
                           var base64payload = accessToken.Split('.')[1];
                           var bytes = Convert.FromBase64String(base64payload);
                           var jsonPayload = Encoding.UTF8.GetString(bytes);
                           var claims = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonPayload);

                           foreach (var claim in claims)
                           {
                               context.Identity.AddClaim(new Claim(claim.Key, claim.Value));
                           }

                           return Task.CompletedTask;
                       }
                   };
               });

            services.AddHttpClient();




            services.AddControllersWithViews();
            services.AddTransient<ISessionStore, DistributedSessionStore>();
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IUserNotificationService, UserNotificationService>();
            //services.AddTransient<IProductInformationServices, ProductInformationServices>();
            //services.AddTransient<IProductInformationRepository, ProductInformationRepository>();
            //services.AddTransient<IDateProductPriceServices, DateProductPriceServices>();
            //services.AddTransient<IDateProductPriceRepository, DateProductPriceRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ICommonConnection, CommonConnection>();
            services.AddTransient<DbContext, BinderDBContext>();
            services.AddDbContext<BinderDBContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("SqlConnectionString"));
            });


            //  services.AddDirectoryBrowser();

            //services.AddMvc(option => option.EnableEndpointRouting = false).AddNewtonsoftJson();
            services.AddSingleton<IFileProvider>(new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));
            services.AddMvc(mvcOption =>
            {
                mvcOption.EnableEndpointRouting = false;
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
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
              //  app.UseHsts();
            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCookiePolicy();
            app.UseSession();
            //Add JWToken to all incoming HTTP Request Header
            app.Use(async (context, next) =>
            {
                var JWToken = context.Request.Cookies["LoginCookie"];
                if (!string.IsNullOrEmpty(JWToken))
                {
                    context.Request.Headers.Add("Authorization", "Bearer " + JWToken);
                }
                await next();
            });


            app.UseAuthorization();
            //app.UseHttpContextItemsMiddleware();
            app.UseMvc(routes =>
            {

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Account}/{action=Login}/{id?}");
            });

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllerRoute(
            //        name: "default",
            //        pattern: "{controller=Account}/{action=Login}/{id?}");
            //});
        }
    }
}
