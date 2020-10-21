﻿using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderContractsWeb
{
    public interface IDealerTypeServices:IBinderBaseServices
    {
        List<DealerType> GetDealerType();
    }
}
