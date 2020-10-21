using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class ProductPriceRepository:BinderBaseRepository<ProductPrice>,IProductPriceRepository
    {
        private ICommonConnection _connection;
        public ProductPriceRepository(DbContext db, ICommonConnection connection) :base(db)
        {
            _connection = connection;
        }

        public GridEntity<ProductPrice> GetProductPriceList(GridOptions options)
        {
            var query = string.Format(@"select ProductPrice.ProductId,ProductPrice.ProductName,ProductPrice.PricingDate,ProductPrice.FirstSlotPrice,ProductPrice.SecondSlotPrice  from ProductPrice ");

            return new Kendo<ProductPrice>.Grid(_connection).DataSource(options, query, "ProductId");
        }
    }
}
