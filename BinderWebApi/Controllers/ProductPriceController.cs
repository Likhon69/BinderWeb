using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BinderCore.Services.SystemAdmin.Contracts;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Services.BinderContractsWeb;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderWebApi.Controllers
{
   
    public class ProductPriceController : BaseApiController
    {

        private readonly IDateProductPriceServices _dateProductPriceServices;
        private readonly IAddDateProductPriceServices _addDateProductPriceServices;
        private IUsersService _userService;
        private readonly IProductPriceServices _productPriceServices;
        private IMapper _mapper;
        public ProductPriceController(IDateProductPriceServices dateProductPriceServices, IAddDateProductPriceServices addDateProductPriceServices, IMapper mapper, IProductPriceServices productPriceServices, IUsersService userService)
        {
            _dateProductPriceServices = dateProductPriceServices;
            _addDateProductPriceServices = addDateProductPriceServices;
            _mapper = mapper;
            _productPriceServices = productPriceServices;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult GenerateProductPrice(ProductPriceParam param)
        {
            return Ok(_dateProductPriceServices.GenerateProductPrice(param));

        }

        [HttpPost]
        public IActionResult AddDateProductPrice(ProductPriceTempParamDto tempProduct)
        {
           
            if (User.Identity.IsAuthenticated)
            {
                var id = User.Identity.Name;
                var user = _userService.GetUserByLoginId(id);
                foreach(var tmid in tempProduct.productPriceTempVms)
                {
                    tmid.CreateBy = user.UserId;
                    tmid.CreateDate = DateTime.Now;
                }
                   var tmpProd = _mapper.Map<List<ProductPriceTemp>>(tempProduct.productPriceTempVms);
                return Ok(_addDateProductPriceServices.AddDateProductPrice(tmpProd, tempProduct.param));
            }
            return BadRequest();


        }

        [HttpPost]
        public  IActionResult GetProductPriceList(GridOptions options)
        {
            return Ok(_productPriceServices.GetProductPriceList(options));
        }
    }
}
