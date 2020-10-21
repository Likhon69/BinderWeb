using AutoMapper.Configuration;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderWeb.Models;
using BinderWeb.Models.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BinderCoreApi.Controllers
{
    public class OAuthController : BaseApiController
    {
        //  public IConfiguration Configuration { get; }
        private readonly AppSettings _appSettings;
        private IUsersService _usersService;
        public OAuthController(IOptions<AppSettings> appSettings, IUsersService usersService)
        {
            //Configuration = configuration;
            _appSettings = appSettings.Value;
            _usersService = usersService;

        }


        //[HttpGet]
        //public IActionResult Authorize(
        //    string response_type, // authorization flow type 
        //    string client_id, // client id
        //    string redirect_uri,
        //    string scope, // what info I want = email,grandma,tel
        //    string state) // random string generated to confirm that we are going to back to the same client
        //{
        //    // ?a=foo&b=bar
        //    var query = new QueryBuilder();
        //    query.Add("redirectUri", redirect_uri);
        //    query.Add("state", state);

        //    return View(model: query.ToString());
        //}

        [HttpPost]
        public IActionResult Authorize(
            string username,
            string redirectUri,
            string state)
        {
            const string code = "BABAABABABA";

            var query = new QueryBuilder();
            query.Add("code", code);
            query.Add("state", state);


            return Redirect($"{redirectUri}{query.ToString()}");
        }

        [HttpPost]

        public async Task<IActionResult> Token([FromBody]AuthenticateModel model)
        {
            // some mechanism for validating the code

            var user = _usersService.GetUser(model.LoginId, model.Password);
            //  if(user==null)
            //return Redirect();
            if (user != null)
            {
                var claims = new[]
              {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, user.LoginId),
                new Claim(ClaimTypes.Name, user.LoginId),

                new Claim("granny", "cookie")
            };

                var secretBytes = Encoding.UTF8.GetBytes(_appSettings.Secret);
                var key = new SymmetricSecurityKey(secretBytes);
                var algorithm = SecurityAlgorithms.HmacSha256;

                var signingCredentials = new SigningCredentials(key, algorithm);

                var token = new JwtSecurityToken(
                  _appSettings.Issuer,
                    _appSettings.Audiance,
                    claims,
                    notBefore: DateTime.Now,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials);

                var access_token = new JwtSecurityTokenHandler().WriteToken(token);

                var responseObject = new
                {
                    access_token,
                    token_type = "Bearer",
                    raw_claim = "oauthTutorial",
                    refresh_token = "RefreshTokenSampleValueSomething77"
                };

                var responseJson = JsonConvert.SerializeObject(responseObject);
                var responseBytes = Encoding.UTF8.GetBytes(responseJson);

                await Response.Body.WriteAsync(responseBytes, 0, responseBytes.Length);

                var loginIdentity = new ClaimsIdentity(claims, "ClientCookie");
                var userPrincipal = new ClaimsPrincipal(new[] { loginIdentity });

                await HttpContext.SignInAsync("ClientCookie", userPrincipal);

                return Redirect(model.RedirectUrl);
            }
            else
            {
                return BadRequest("User Id or Password is incorrect");
            }
        }

        [HttpGet]
        [Authorize]
        public IActionResult Validate()
        {
            if (HttpContext.Request.Query.TryGetValue("access_token", out var accessToken))
            {

                return Ok("Success");
            }
            return BadRequest();
        }
    }
}
