﻿using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderWebContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebServices
{
    public class ProductDetailsServices : BinderBaseServices, IProductDetailsServices
    {
        private IProductDetailsRepository _repository;
        public ProductDetailsServices(IProductDetailsRepository repository) 
        {
            _repository = repository;
        }
        public ProductDetailsDto GetProductDetails(string loginId, int productId, DateTime date)
        {
            var data = _repository.GetProductDetails(loginId, productId, date);

            return data;
        }
    }
}
