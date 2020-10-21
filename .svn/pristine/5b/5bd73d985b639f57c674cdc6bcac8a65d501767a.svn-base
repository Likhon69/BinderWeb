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
    public class DateProductPriceRepository : BinderBaseRepository<DateProductPriceVm>, IDateProductPriceRepository
    {
        ICommonConnection _connection;
        public DateProductPriceRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }

        public ICollection<DateProductPriceVm> GenerateProductPrice(ProductPriceParam param)
        {
            List<DateProductPriceVm> Ldp = new List<DateProductPriceVm>();
            var produncts = GetProduct();

            for (DateTime date = param.DatePickerFrom; date <= param.DatePickerTo; date = date.AddDays(1.0))
            {
                foreach (var prd in produncts)
                {
                    DateProductPriceVm dp = new DateProductPriceVm();
                    dp.PricingDate = date;
                    dp.ProductId = prd.ProductId;
                    dp.ProductName = prd.ProductName;
                    dp.FirstSlotPrice = param.FirstSlotPrice;
                    dp.SecondSlotPrice = param.SecondSlotPrice;

                    Ldp.Add(dp);

                }

            }
            //var dateDiff = (param.DatePickerTo - param.DatePickerFrom);
            //for (int i = 0; i < dateDiff.TotalDays; i++)
            //{
            //  


            //}
            return Ldp;

        }
        public List<ProductInformationVm> GetProduct()
        {
            return new Data<ProductInformationVm>(_connection).DataSource("Select * from ProductInformation");
        }
    }
}
