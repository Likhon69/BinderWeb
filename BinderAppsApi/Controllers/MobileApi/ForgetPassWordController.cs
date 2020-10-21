﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BinderCore.Services.SystemAdmin.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderAppsApi.Controllers.MobileApi
{

    public class ForgetPassWordController : BaseApiController
    {
        private IUsersService _services;
        public ForgetPassWordController(IUsersService services)
        {
            _services = services;
        }



        [HttpPost]
        public IActionResult ConfirmationUser(string loginId)
        {
            
            return Ok(_services.SaveUserOTP(loginId));
        }
    }
}