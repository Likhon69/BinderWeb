using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderWebContracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Linq.Expressions;

namespace BinderWeb.Services.BinderWebServices
{
    public class UnitServices:BinderBaseServices,IUnitServices
    {
        IUnitRepository _repository;
        public UnitServices(IUnitRepository repository)
        {
            _repository = repository;
        }

        public List<Unit> GetUnits()
        {
            var query = _repository.GetAll();
            return query.ToList();
        }
    }
}
