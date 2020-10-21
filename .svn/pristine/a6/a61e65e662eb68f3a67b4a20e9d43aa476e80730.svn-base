using BinderCore.DataServices.Contracts.SystemAdmin;
using BinderCore.Services.Base;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderCore.Services.SystemAdmin.Services
{
    public class GroupMemberServices :IGroupMemberServices
    {
        private IGroupMemberRepository _repository;
        public GroupMemberServices(IGroupMemberRepository repository)
        {
            _repository = repository;
        }
        public List<GroupMember> GetGroupMember(int userId)
        {
            var data = _repository.Get(c => c.UserId == userId).ToList();

            return data;
        }
    }
}
