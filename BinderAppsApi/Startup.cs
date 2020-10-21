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
using BinderAppsApi.Configuration;
using BinderWeb.Services.BinderMobileContracts;
using BinderWeb.Services.BinderMobileServices;
using BinderWeb.Repository.BinderMobileContracts;
using BinderWeb.Repository.BinderMobileRepositories;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using CommonUnitOfWork;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.DataServices.SystemAdmin.DataServices;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderCore.Services.SystemAdmin.Services;
using Binder.NotificationService.Contracts;
using BinderCore.DataServices.Contracts.Notification;
using BinderCore.DataServices.Repositories.Notification;
using Binder.NotificationService.Services;

namespace BinderAppsApi
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Binder Apps API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement() { });


            });

            services.ConfigureSwaggerGen(options =>
            {
                options.OperationFilter<AuthorizationHeaderParameterOperationFilter>();
            });



            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
             {
                 x.RequireHttpsMetadata = false;
                 x.SaveToken = true;
                 x.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuerSigningKey = true,
                     IssuerSigningKey = new SymmetricSecurityKey(key),
                     ValidateIssuer = false,
                     ValidateAudience = false
                 };
             }).AddCookie("CokieAuth", config =>
             {
                 config.Cookie.Name = "LoginCookie";
               
                // config.LoginPath = "/Home/Index";

             });



            services.AddTransient<IUnitServices, UnitServices>();
            services.AddTransient<IUnitRepository, UnitRepository>();
            services.AddTransient<IProductPriceListServices, ProductPriceListServices>();
            services.AddTransient<IProductPriceListRepository, ProductPriceListRepository>();
            services.AddTransient<IOrderRequestServices, OrderRequestServices>();
            services.AddTransient<IOrderRequestRepository, OrderRequestRepository>();
            services.AddTransient<IPaymentServices, PaymentServices>();
            services.AddTransient<IPaymentRepository, PaymentRepository>();
            services.AddTransient<IOrderHistoryServices, OrderHistoryServices>();
            services.AddTransient<IOrderHistoryRepository, OrderHistoryRepository>();
            services.AddTransient<IProductDetailsServices, ProductDetailsServices>();
            services.AddTransient<IProductDetailsRepository, ProductDetailsRepository>();
            services.AddTransient<IUserDetailsServices, UserDetailsServices>();
            services.AddTransient<IUserDetailsRepository, UserDetailsRepository>();
            services.AddTransient<IBankServices, BankServices>();
            services.AddTransient<IBankRepository, BankRepository>();
            services.AddTransient<IBankBranchServices, BankBranchServices>();
            services.AddTransient<IBankBranchRepository, BankBranchRepository>();
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IUserNotificationService, UserNotificationService>();
            services.AddTransient<IEmailContentRepository, EmailContentRepository>();
            services.AddTransient<IEmailRepository, EmailRepository>();
            services.AddTransient<IMessageRepository, MessageRepository>();
            services.AddTransient<ISmsRepository, SmsRepository>();
            services.AddTransient<ICommonConnection, CommonConnection>();
            services.AddTransient<IOrderNotificationService, OrderNotificationService>();


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
            app.UseCookiePolicy();
            app.Use(async (context, next) =>
            {
                var JWToken = context.Request.Cookies["LoginCookie"];
                if (!string.IsNullOrEmpty(JWToken))
                {
                    context.Request.Headers.Add("Authorization", "Bearer " + JWToken);
                }
                await next();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapControllerRoute(
                //  name: "default",
                //  pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            // Set up custom content types - associating file extension to MIME type
            var provider = new FileExtensionContentTypeProvider();
            // Add new mappings
            provider.Mappings[".myapp"] = "application/x-msdownload";
            provider.Mappings[".htm3"] = "text/html";
            provider.Mappings[".image"] = "image/png";
            // Replace an existing mapping
            provider.Mappings[".rtf"] = "application/x-msdownload";
            // Remove MP4 videos.
            provider.Mappings.Remove(".mp4");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "UploadFile")),
                RequestPath = "/StaticFiles",
                ContentTypeProvider = provider
            });

            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "UploadFile")),
                RequestPath = "/StaticFiles"
            });


            var builder = new ConfigurationBuilder()
           .SetBasePath(env.ContentRootPath)
           .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
             .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
           .AddEnvironmentVariables();




            builder.Build();
        }
    }
}