using BinderUtility;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class DateProductPriceApproveUnApproveRepository : BinderBaseRepository<DateProductPriceVm>, IDateProductPriceApproveUnApproveRepository
    {
        private ICommonConnection _connection;
        public DateProductPriceApproveUnApproveRepository(DbContext db, ICommonConnection connection) :base(db)
        {
            _connection = connection;
        }
        public ICollection<DateProductPriceVm> DateProductPriceSearch(ProductPriceParam param)
        {
            var quary = string.Format(@"select ProductPriceTemp.ProductPriceId,ProductPriceTemp.PricingDate,ProductPriceTemp.FirstSlotPrice,ProductPriceTemp.SecondSlotPrice,ProductInformation.ProductName
            from ProductPriceTemp 	left join ProductInformation on ProductPriceTemp.ProductId = ProductInformation.ProductId 
        where ProductPriceTemp.PricingDate between '{0}' and  '{1}' order by ProductPriceTemp.PricingDate ", param.DatePickerFrom, param.DatePickerTo);

            return new Data<DateProductPriceVm>(_connection).DataSource(quary);
        }
    }
}
