using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderContractsWeb
{
    public interface IAddDateProductPriceApproveRepository:IBinderBaseRepository<ProductPrice>
    {
        List<ProductPriceTempVm> DateProductPriceApprove(List<int> listProduct);
    }
}
