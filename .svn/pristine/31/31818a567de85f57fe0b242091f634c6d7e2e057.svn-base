using BinderCore.DataServices.Base;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.Models.SystemAdmin;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderCore.DataServices.SystemAdmin.DataServices
{
    public class MenuRepository : CoreBaseRepository<Menu>, IMenuRepository
    {
        ICommonConnection _connection;
        public MenuRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }

        public List<MenuDto> GetParentMenuByMenu(int parentMenuId)
        {
            string query = $@"SELECT * from Menu where MenuId={parentMenuId} ";
            return new Data<MenuDto>(_connection).DataSource(query);
        }

        public IQueryable<MenuDto> SelectMenuByUserPermission(int userId)
        {
            string query = $@"SELECT DISTINCT Menu.MenuId,Menu.ModuleId, GroupMember.UserId, GroupPermission.PermissionTableName, 
                            Menu.MenuName, Menu.MenuPath, Menu.ParentMenu,SORORDER,ToDo FROM GroupMember INNER JOIN Groups 
                            ON GroupMember.GroupId = Groups.GroupId INNER JOIN GroupPermission ON Groups.GroupId = GroupPermission.GroupId 
                            INNER JOIN Menu ON GroupPermission.ReferenceID = Menu.MenuId WHERE (GroupMember.UserId ={userId}) AND 
                            (GroupPermission.PermissionTableName = 'Menu')
                            order by Sororder, Menu.MenuName";
            return new Data<MenuDto>(_connection).DataSource(query).AsQueryable();
        }
    }
}
