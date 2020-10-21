using BinderUtility;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class DateProductPriceServices : BinderBaseServices, IDateProductPriceServices
    {

        private readonly IDateProductPriceRepository _repository;

        public DateProductPriceServices(IDateProductPriceRepository repository)
        {
            _repository = repository;
        }
        public ICollection<DateProductPriceVm> GenerateProductPrice(ProductPriceParam param)
        {
            return _repository.GenerateProductPrice(param);
        }
    }
}
