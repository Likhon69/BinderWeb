using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderWebContracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace BinderWeb.Repository.BinderWebRepositories
{
    public class ProductPriceListRepository : BinderBaseRepository<ProductPriceDto>, IProductPriceListRepository
    {
        ICommonConnection _connection;
        public ProductPriceListRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }
        public ICollection<ProductPriceDto> GetProductPriceLists(string loginId)
        {
            
            string query = string.Format(@"Select PricingDate,ProductId,FirstSlotPrice,
SecondSlotPrice from ProductPrice where PricingDate>='{0}'  ", DateTime.Now);
            return new Data<ProductPriceDto>(_connection).DataSource(query);


        }
    }
}
