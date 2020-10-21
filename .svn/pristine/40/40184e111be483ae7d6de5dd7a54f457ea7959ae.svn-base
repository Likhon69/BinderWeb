using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class DateProductPriceApproveUnApproveServices : BinderBaseServices, IDateProductPriceApproveUnApproveServices
    {
        private readonly IDateProductPriceApproveUnApproveRepository _repository;
        public DateProductPriceApproveUnApproveServices(IDateProductPriceApproveUnApproveRepository repository)
        {
            _repository = repository;
        }
        public ICollection<DateProductPriceVm> DateProductPriceSearch(ProductPriceParam param)
        {
            return _repository.DateProductPriceSearch(param);
        }
    }
}
