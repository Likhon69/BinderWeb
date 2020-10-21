using BinderCore.DataServices.Contracts.SystemAdmin;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderCore.Services.SystemAdmin.Services
{
    public class GroupServices : IGroupServices
    {
        private IGroupRepository _repository;
        public GroupServices(IGroupRepository repository)
        {
            _repository = repository;
        }
        public ICollection<Groups> GetGroups()
        {
            var data = _repository.GetAll().ToList();
            return data;
        }
    }
}
