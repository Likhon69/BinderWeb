﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinderWeb.Configure
{
    public class CustomCookieAuthenticationEvents : CookieAuthenticationEvents
    {


        public CustomCookieAuthenticationEvents()
        {
            // Get the database from registered DI services.

        }

        public override async Task ValidatePrincipal(CookieValidatePrincipalContext context)
        {
            var userPrincipal = context.Principal;

            // Look for the LastChanged claim.
            var lastChanged = (from c in userPrincipal.Claims
                               where c.Type == "LastChanged"
                               select c.Value).FirstOrDefault();

            if (string.IsNullOrEmpty(lastChanged))
            {
                context.RejectPrincipal();

                await context.HttpContext.SignOutAsync("LoginCookie");
            }
        }
    }
}
