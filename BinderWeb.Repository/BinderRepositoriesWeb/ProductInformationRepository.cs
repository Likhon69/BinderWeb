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
    public class ProductInformationRepository:BinderBaseRepository<ProductInformation>,IProductInformationRepository
    {
        ICommonConnection _connection;
        public ProductInformationRepository(DbContext db, ICommonConnection connection) :base(db)
        {
            _connection = connection;
        }

        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }
        }

        public GridEntity<ProductInformationVm> GetProductInfoSummary(GridOptions options)
        {
            string data = string
               .Format(@"select ProductId,ProductInformation.ProductName,ProductInformation.ProductCode,Unit.UnitName,Unit.UnitId from ProductInformation
inner join Unit on ProductInformation.UnitId = Unit.UnitId;");

            return new Kendo<ProductInformationVm>.Grid(_connection).DataSource(options, data, "ProductId");
        }
    }
}
