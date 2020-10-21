﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.BinderContractsWeb;
using BinderWeb.Services.BinderWebContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderWebApi.Controllers.MobileApi
{


    public class ProductController : BaseApiController
    {
        private IProductInformationServices _productInformationServices;

        private IMapper _mapper;
        public ProductController(IProductInformationServices productInformationServices, IMapper mapper)
        {
            _productInformationServices = productInformationServices;

            _mapper = mapper;
        }

        //[Authorize]
        [HttpPost]
        public IActionResult AddProductInformation([FromBody]ProductInformation product)
        {
            /* var data =
                 (ProductInformation)Newtonsoft.Json.JsonConvert.DeserializeObject(product, typeof(ProductInformation));*/
            //var data = _mapper.Map<ProductInformation>(product);
            //var res = "";
            //if (product.ProductId == null)
            //{
            //    var isSucess = _productInformationServices.AddProductInformation(product);
            //    res = isSucess == true ? "Success" : "Failed";
            //}
            //else
            //{
            //    var isSucess = _productInformationServices.Update(product);
            //    res = isSucess == true ? "Success" : "Failed";
            //}

            return Ok(_productInformationServices.AddProductInformation(product));
        }

        
        [HttpPost]
        public IActionResult GetProductInfoSummary(GridOptions options)
        {
           
             return Ok(_productInformationServices.GetProductInfoSummary(options));
            
        }
      
    }
}
