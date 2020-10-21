using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinderCoreApi.Configuration
{

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class AuthorizeUserAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        public AuthorizeUserAttribute()
        {
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            var isAuthorize = user.Identity.IsAuthenticated;
            var cookies = context.HttpContext.Request.Cookies;


        }
    }
}
