using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class LocationServices : BinderBaseServices, ILocationServices
    {
        private ILocationRepository _repository;
        private IUnitOfWork _unitOfWork;
        public LocationServices(IUnitOfWork unitOfWork)
        {
            //_repository = repository;
            _unitOfWork = unitOfWork;
        }

         

        public GridEntity<BranchDto> GetLocation(GridOptions options)
        {
            return _unitOfWork.Location.GetLocation(options);
        }
    }
}
