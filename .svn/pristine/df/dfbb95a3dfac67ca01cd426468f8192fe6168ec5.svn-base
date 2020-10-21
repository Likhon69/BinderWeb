using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class AddDateProductPriceApproveRepository : BinderBaseRepository<ProductPrice>, IAddDateProductPriceApproveRepository
    {
        private ICommonConnection _connection;

        public AddDateProductPriceApproveRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }
        }

        public List<ProductPriceTempVm> DateProductPriceApprove(List<int> listProduct)
        {
            string ids = "";
            foreach (var id in listProduct)
            {
                ids += id.ToString() + ",";
            }
            if (ids != "")
            {
                ids = ids.Remove(ids.Length - 1, 1);
            }


            var query = string.Format(@"select ProductPriceTemp.ProductId,ProductPriceTemp.PricingDate,ProductPriceTemp.FirstSlotPrice,ProductPriceTemp.SecondSlotPrice,ProductInformation.ProductName,ProductPriceTemp.ProductPriceId from ProductPriceTemp 
                                        inner join ProductInformation on ProductPriceTemp.ProductId = ProductInformation.ProductId
                                        where ProductPriceId in ({0})", ids);


            var Data = _connection.Data<ProductPriceTempVm>(query);

            return Data;
        }

       

        //public List<ProductPriceTempVm> DeleteProductPriceTemp(List<int> listProduct)
        //{
        //    string ids = "";
        //    foreach (var id in listProduct)
        //    {
        //        ids += id.ToString() + ",";
        //    }
        //    if (ids != "")
        //    {
        //        ids = ids.Remove(ids.Length - 1, 1);
        //    }
        //    var query2 = string.Format(@"select *from ProductPriceTemp where ProductPriceId = {0}", ids);

        //    return new Data<ProductPriceTempVm>(_connection).DataSource(query2);
        //}

        //public List<ProductPriceTemp> SameData(List<int> listProduct)
        //{
        //    string ids = "";
        //    foreach (var id in listProduct)
        //    {
        //        ids += id.ToString() + ",";
        //    }
        //    if (ids != "")
        //    {
        //        ids = ids.Remove(ids.Length - 1, 1);
        //    }
        //    var query = string.Format(@"select ProductPriceTemp.ProductId,ProductPriceTemp.PricingDate,ProductPriceTemp.FirstSlotPrice,ProductPriceTemp.SecondSlotPrice,ProductInformation.ProductName from ProductPriceTemp 
        //                                inner join ProductInformation on ProductPriceTemp.ProductId = ProductInformation.ProductId
        //                                where ProductPriceId in ({0})", ids);


        //    var Data = _connection.Data<ProductPrice>(query);

        //        var apPro = context.ProductPrice.FirstOrDefault(c => c.PricingDate.Equals();





        //}
    }

    

}

