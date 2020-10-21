using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinderWebApi.Models
{
    public class MinimumExpHandler: AuthorizationHandler<MinimumExpRequirement>
    {
        protected override Task HandleRequirementAsync(
              AuthorizationHandlerContext context,
              MinimumExpRequirement requirement)
        {
            var user = context.User;
            var claim = context.User.FindFirst("MinExperience");
            if (claim != null)
            {
                var expInYears = int.Parse(claim?.Value);
                if (expInYears >= requirement.MinimumExp)
                    context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
