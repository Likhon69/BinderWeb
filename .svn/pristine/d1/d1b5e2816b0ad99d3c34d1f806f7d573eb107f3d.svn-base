using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderWeb.Services.BinderContractsWeb
{
    public interface IDealerInformationServices:IBinderBaseServices
    {
        string AddDealerInformation(DealerInformationVm entity);
        GridEntity<DealerInformationVm> GetDealerInfo(GridOptions options);
        IQueryable<DealerWithLocationMapping> GetDealerLocationMapping(int dealerId);
        List<DealerInformation> GetDealers();
    }
}
