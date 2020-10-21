using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderWebContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebServices
{
    public class ProductPriceListServices : BinderBaseServices, IProductPriceListServices
    {
        IProductPriceListRepository _repository;
        public ProductPriceListServices(IProductPriceListRepository repository) 
        {
            _repository = repository;
        }

        public ICollection<ProductPriceDto> GetProductPriceLists(string loginId)
        {
            var data = _repository.GetProductPriceLists(loginId);

            return data;
        }
    }
}
