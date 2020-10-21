using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.Auth;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderWebContracts
{
    public interface IUserDetailsRepository:IBinderBaseRepository<Users>
    {
        UserDetailsDto GetUserDetails(string loginId);
      //  AuthorizeUser GetUserByLoginId(string loginId);
    }
}
