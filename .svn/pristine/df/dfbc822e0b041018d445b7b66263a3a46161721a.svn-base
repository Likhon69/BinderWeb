using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BinderCore.Models.SystemAdmin;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderWeb.Models;
using BinderWeb.Models.Auth;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.BinderWebContracts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BinderAppsApi.Controllers.MobileApi
{


    public class UserController : BaseApiController
    {
        private IUserDetailsServices _userDetailsServices;
        private IUsersService _usersService;
        private IMapper _mapper;
        public UserController(IUserDetailsServices userDetailsServices, IUsersService usersService, IMapper mapper)
        {
            _userDetailsServices = userDetailsServices;
            _mapper = mapper;
            _usersService = usersService;

        }

        [HttpGet]
        public UserDetailsDto GetUserDetails(string loginId)
        {
            var data = _userDetailsServices.GetUserDetails(loginId);

            return data;
        }

        [AllowAnonymous]
        [ProducesResponseType(typeof(AuthorizeUser), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [HttpPost("/token")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userDetailsServices.Authenticate(model.LoginId, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });


            //var loginClaims = new List<Claim>()
            //{
            //     new Claim(ClaimTypes.Name, user.LoginId.ToString()),
            //     new Claim(ClaimTypes.Sid, user.LoginId.ToString())
            //};

            //var loginIdentity = new ClaimsIdentity(loginClaims, "LoginCookie");
            //var userPrincipal = new ClaimsPrincipal(new[] { loginIdentity });

            //HttpContext.SignInAsync("CokieAuth", userPrincipal);

            return Ok(user);
        }

        [HttpPost]
        public IActionResult SendOTP([FromBody]string loginId)
        {

            var user = _usersService.SaveUserOTP(loginId);


            if (user == null)
            {
                return BadRequest(new { message = "User is incorrect" });
            }
            else
            {
                var result = user;

                return Ok(result);
            }


        }

        [HttpPost]
        public IActionResult ChangePassword([FromBody]ChangePaswordModel model)
        {

            try
            {


                var user = _usersService.ChangePassword(model);


                if (user == null)
                {
                    return BadRequest(new { message = "User is incorrect" });
                }
                else
                {
                    var result = user;

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
    }
}
