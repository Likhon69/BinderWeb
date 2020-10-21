using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BinderCore.Models.SystemAdmin;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderCoreApi.Configuration;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.Auth;
using BinderWeb.Models.MobileApiDTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderCoreApi.Controllers.MobileApi
{
    [AuthorizeUser]
    public class UsersController : BaseApiController
    {


        private IUsersService _usersService;
        public UsersController(IUsersService usersService)
        {

            _usersService = usersService;
        }

        [HttpPost]
        public GridEntity<UsersDto> GetUserSummary(GridOptions options)
        {
            return _usersService.GetUserSummary(options);
        }

        [AllowAnonymous]
        [ProducesResponseType(typeof(AuthorizeUser), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]

        [HttpPost]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {

            var user = _usersService.Authenticate(model.LoginId, model.Password);

            //  var cookie = HttpContext.Session;
            if (user == null)
            {
                if (User.Identity.IsAuthenticated)
                {
                    HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                }

                return BadRequest(new { message = "Username or password is incorrect" });
            }
            var loginClaims = new List<Claim>()
            {
                 new Claim(ClaimTypes.Name, user.LoginId.ToString()),
                 //new Claim(ClaimTypes.Sid, user.LoginId.ToString())
            };

            var loginIdentity = new ClaimsIdentity(loginClaims, CookieAuthenticationDefaults.AuthenticationScheme);
            var userPrincipal = new ClaimsPrincipal(new[] { loginIdentity });

            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, userPrincipal);



            var result = user;

            return Ok(result);


        }

        [HttpPost]
        public IActionResult SignOut()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok("Success");

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
        public IActionResult SaveUser([FromBody]UsersDto user)
        {

            var res = _usersService.SaveUser(user);
            return Ok(res);



        }

        [HttpGet]
        public IActionResult GetGroupByUserId(int userId)
        {

            var user = _usersService.GetGroupMemberByUserId(userId);


            return Ok(user);



        }
        [HttpGet]
        public IActionResult GetGroups()
        {

            var user = _usersService.GetGroups();


            return Ok(user);



        }

        [HttpGet]
        public IActionResult GetUserByLoginId(string loginId)
        {

            var user = _usersService.GetUserByLoginId(loginId);


            return Ok(user);



        }
        [HttpGet]
        public IActionResult GetAuthoriseUser()
        {

            if (User.Identity.IsAuthenticated)
            {
                var loginId = User.Identity.Name;

                var user = _usersService.GetUserByLoginId(loginId);
                user.Password = "";


                return Ok(user);
            }

            return BadRequest();


        }

    }
}
