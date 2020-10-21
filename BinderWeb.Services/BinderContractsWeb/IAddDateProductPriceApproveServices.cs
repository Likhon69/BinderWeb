﻿using BinderCore.Models.SystemAdmin;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderContractsWeb
{
    public interface IAddDateProductPriceApproveServices:IBinderBaseServices
    {
        string AddProductPriceApprove(List<int> listProduct,Users user);
    }
}
