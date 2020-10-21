using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class DealerTypeServices : BinderBaseServices, IDealerTypeServices
    {
        //private IDealerTypeRepository _repository;
        private IUnitOfWork _unitOfWork;
        public DealerTypeServices( IUnitOfWork unitOfWork)
        {
            //_repository = repository;
            _unitOfWork = unitOfWork;
        }
        public List<DealerType> GetDealerType()
        {
            return _unitOfWork.DealerType.GetAll().ToList();
        }
    }
}
