﻿using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderWebContracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderWebRepositories
{
    public class ProductDetailsRepository : BinderBaseRepository<ProductDetailsDto>, IProductDetailsRepository
    {

        private ICommonConnection _connection;
        public ProductDetailsRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }
        public ProductDetailsDto GetProductDetails(string loginId, int productId, DateTime date)
        {
            string query = string.Format(@"Select PricingDate, ProductInformation.ProductId,ProductInformation.ProductName,FirstSlotPrice,
SecondSlotPrice, 1 as FirstPricingSloteId, 2 as SecondPricingSloteId  from ProductInformation
inner join ProductPrice on ProductPrice.ProductId=ProductInformation.ProductId
where ProductPrice.PricingDate='{0}' and ProductInformation.ProductId={1}
order by PricingDate", date, productId);
            var product = new Data<ProductDetailsDto>(_connection).SingleData(query);
            if (product != null)
            {

                var location = new Data<LocationDto>(_connection).DataSource(string.Format(@"
                    Select  Branch.BranchId as LocationId,BranchName as LocationName from  [DealerWithLocationMapping] dl
                 inner join Branch on Branch.BranchId = dl.LocationId
                 inner join Users on Users.EmployeeId=dl.DealerId
                 where LoginId ='{0}' ", loginId));

                product.PickupPoint = location;
                product.BagType = new Data<BagTypeDto>(_connection).DataSource("Select * from BagType");
            }
            return product;
        }
    }
}
