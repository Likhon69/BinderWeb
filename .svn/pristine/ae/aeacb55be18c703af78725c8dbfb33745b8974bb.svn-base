using BinderCore.Models.SystemAdmin;
using BinderCore.Services.Base;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderCore.Services.SystemAdmin.Contracts
{
    public interface IMenuService : ICoreBaseServices
    {
        GridEntity<MenuDto> GetMenuSummary(GridOptions option);

        IQueryable<MenuDto> SelectAllMenu();

        string SaveMenu(Menu menu);

        IQueryable<MenuDto> SelectAllMenuByModuleId(int moduleId);

        IQueryable<MenuDto> SelectMenuByUserPermission(int userId);

        List<MenuDto> GetToDoList(int userId);

        string UpdateMenuSorting(List<Menu> menuList);

        List<MenuDto> GetParentMenuByMenu(int parentMenuId);

        Menu GetMenuByMenuId(int menuId);


        List<MenuDto> GetHierarckyMenuByMenuId(int menuId);
        List<MenuDto> GetReportMenuComboByModuleId(int moduleId);
    }
}
