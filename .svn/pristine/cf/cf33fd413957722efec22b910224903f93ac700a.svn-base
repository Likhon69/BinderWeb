using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.Auth;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebContracts
{
    public interface IUserDetailsServices:IBinderBaseServices
    {
        UserDetailsDto GetUserDetails(string loginId);
        AuthorizeUser Authenticate(string username, string password);
    }
}
