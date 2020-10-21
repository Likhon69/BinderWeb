using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BinderWeb.Controllers
{
    public class DateProductPriceApproveUnApproveController : Controller
    {
        public IActionResult ApproveUnApproveSettings()
        {
            return View();
        }
    }
}