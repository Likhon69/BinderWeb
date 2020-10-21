﻿using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebContracts
{
    public interface IOrderRequestServices : IBinderBaseServices
    {
        string OrderRequest(OrderRequestDto data);
    }
}
