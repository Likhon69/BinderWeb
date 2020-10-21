using BinderCore.DataServices.Base;
using BinderCore.Models.SystemAdmin;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.DataServices.SystemAdmin.Contracts
{
    public interface IUsersRepository : ICoreBaseRepository<Users>
    {
        GridEntity<UsersDto> GetUserSummary(GridOptions options);
        UsersDto GetMessageUserByUserId(int hrRecordId);
    }
}
