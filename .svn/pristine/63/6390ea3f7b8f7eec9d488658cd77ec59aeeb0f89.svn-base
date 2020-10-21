using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class AddProductPriceHistoryRepository:BinderBaseRepository<ProductPriceHistory>,IAddProductPriceHistoryRepository
    {
        private ICommonConnection _connection;
        public AddProductPriceHistoryRepository(DbContext db, ICommonConnection connection) :base(db)
        {
            _connection = connection;
        }
    }
}
