using BinderCore.DataServices.Base;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.Models.SystemAdmin;
using BinderCore.Services.Base;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderCore.Services.SystemAdmin.Services
{
    public class MenuService : CoreBaseServices, IMenuService
    {
        IMenuRepository _repository;
        public MenuService(IMenuRepository repository)
        {
            _repository = repository;
        }
        public List<MenuDto> GetHierarckyMenuByMenuId(int menuId)
        {
            throw new NotImplementedException();
        }

        public Menu GetMenuByMenuId(int menuId)
        {
            throw new NotImplementedException();
        }

        public GridEntity<MenuDto> GetMenuSummary(GridOptions option)
        {
            throw new NotImplementedException();
        }

        public List<MenuDto> GetParentMenuByMenu(int parentMenuId)
        {
            return _repository.GetParentMenuByMenu(parentMenuId);
        }

        public List<MenuDto> GetReportMenuComboByModuleId(int moduleId)
        {
            throw new NotImplementedException();
        }

        public List<MenuDto> GetToDoList(int userId)
        {
            throw new NotImplementedException();
        }

        public string SaveMenu(Menu menu)
        {
            throw new NotImplementedException();
        }

        public IQueryable<MenuDto> SelectAllMenu()
        {
            throw new NotImplementedException();
        }

        public IQueryable<MenuDto> SelectAllMenuByModuleId(int moduleId)
        {
            throw new NotImplementedException();
        }

        public IQueryable<MenuDto> SelectMenuByUserPermission(int userId)
        {
            // var menu= _repository.GetAll();
            return _repository.SelectMenuByUserPermission(userId);
        }

        public string UpdateMenuSorting(List<Menu> menuList)
        {
            throw new NotImplementedException();
        }
    }
}
