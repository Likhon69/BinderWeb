using BinderCore.DataServices.Base;
using BinderCore.Models.SystemAdmin;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderCore.DataServices.SystemAdmin.Contracts
{
    public interface IMenuRepository : ICoreBaseRepository<Menu>
    {
        IQueryable<MenuDto> SelectMenuByUserPermission(int userId);
        List<MenuDto> GetParentMenuByMenu(int parentMenuId);
    }
}
