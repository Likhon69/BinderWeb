﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BinderWeb.Controllers
{
    public class OrderPaymentHistoryController : Controller
    {
        public IActionResult OrderPaymentHistorySettings()
        {
            return View();
        }
    }
}