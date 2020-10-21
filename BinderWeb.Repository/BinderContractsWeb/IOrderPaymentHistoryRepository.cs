﻿using BinderUtility;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderContractsWeb
{
    public interface IOrderPaymentHistoryRepository:IBinderBaseRepository<OrderPaymentHistoryDto>
    {
        GridEntity<OrderPaymentHistoryDto> GetOrderPaymentHistory(GridOptions options);
    }
}
