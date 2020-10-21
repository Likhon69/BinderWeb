using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderContractsWeb
{
    public interface IAddDateProductPriceRepository:IBinderBaseRepository<ProductPriceTemp>
    {
        List<ProductPriceTemp> GetProductPriceTemp(ProductPriceParam param);
   
    }
}
