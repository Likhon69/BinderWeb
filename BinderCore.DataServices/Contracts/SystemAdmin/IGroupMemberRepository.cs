using BinderCore.DataServices.Base;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.DataServices.Contracts.SystemAdmin
{
    public interface IGroupMemberRepository:ICoreBaseRepository<GroupMember>
    {
    }
}
