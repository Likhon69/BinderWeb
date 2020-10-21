using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderWebContracts
{
    public interface IProductDetailsRepository:IBinderBaseRepository<ProductDetailsDto>
    {
        ProductDetailsDto GetProductDetails(string loginId,int productId, DateTime date);
    }
}
