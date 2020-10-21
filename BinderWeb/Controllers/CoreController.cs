using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BinderWeb.Controllers
{
    public class CoreController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UserSettings()
        {

            return View("SystemAdmin/Users/UserSettings");

        }
    }
}