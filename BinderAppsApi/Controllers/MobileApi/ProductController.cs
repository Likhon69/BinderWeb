using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.BinderWebContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderAppsApi.Controllers.MobileApi
{
    
    public class ProductController : BaseApiController
    {
        private IProductDetailsServices _productDetailsServices;
        private readonly IProductPriceListServices _productPriceListServices;

        private IMapper _mapper;
        public ProductController(IProductDetailsServices productDetailsServices, IMapper mapper, IProductPriceListServices productPriceListServices)
        {
            _productDetailsServices = productDetailsServices;
            _productPriceListServices = productPriceListServices;
            _mapper = mapper;
        }

        [HttpGet]
        public ProductDetailsDto GetProductDetails(string loginId, int productId, DateTime date)
        {
            return _productDetailsServices.GetProductDetails(loginId, productId, date);

        }

        [HttpGet]
        public ICollection<ProductPriceDto> GetProductPriceList(string loginId)
        {
            return _productPriceListServices.GetProductPriceLists(loginId);
        }
    }
}
