using System;
using System.Text;

using biasedBaking.Data;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace biasedBaking
{
    public class Startup
    {
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            string connectionString = null;
            var uri = new Uri ("postgres://etdafyzknhybmf:d4b4efc01535dc1eaa324c59d03f5cfe7af7e99007953cad70c4ceac0fd916dc@ec2-34-200-106-49.compute-1.amazonaws.com:5432/d2emfus115te9i");
            var username = uri.UserInfo.Split (':') [0];
            var password = uri.UserInfo.Split (':') [1];
            connectionString =
                $"host={uri.Host}; Database={uri.AbsolutePath.Substring (1)}; Username={username}; Password={password}; Port={uri.Port}; SSL Mode=Require; Trust Server Certificate=true;";

            services.AddDbContext<CoreContext> (o => { o.UseNpgsql (connectionString); });
            services.AddControllers ();
            services.AddControllersWithViews ();
            var stuff= Encoding.ASCII.GetBytes (Configuration.GetSection ("appsettings:token").Value);
            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer (options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.ASCII.GetBytes (Configuration.GetSection ("appsettings:token").Value)),
                    ValidateAudience = false,
                    ValidateIssuer = false
                    };
                });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles (configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment ())
            {
                app.UseDeveloperExceptionPage ();
            }
            else
            {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }

            app.UseHttpsRedirection ();
            app.UseStaticFiles ();
            app.UseSpaStaticFiles ();
            app.UseRouting ();
            app.UseAuthorization ();

            app.UseEndpoints (endpoints =>
            {
                endpoints.MapControllerRoute (
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa (spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment ())
                {
                    spa.UseReactDevelopmentServer (npmScript: "start");
                }
            });
        }
    }
}