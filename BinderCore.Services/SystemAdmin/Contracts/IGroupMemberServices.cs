using BinderCore.Services.Base;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.Services.SystemAdmin.Contracts
{
    public interface IGroupMemberServices:ICoreBaseServices
    {
        List<GroupMember> GetGroupMember(int userId);
    }
}
