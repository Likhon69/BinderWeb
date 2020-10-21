using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderWeb.Models.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace BinderWeb.Controllers
{
    public class UsersController : Controller
    {
       
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UserSettings()
        {
            return View("UserSettings");
        }

       
    }
}