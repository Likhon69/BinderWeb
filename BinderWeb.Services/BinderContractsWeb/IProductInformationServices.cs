using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderContractsWeb
{
    public interface IProductInformationServices : IBinderBaseServices
    {
        GridEntity<ProductInformationVm> GetProductInfoSummary(GridOptions options);
        string AddProductInformation(ProductInformation product);
    }
}
