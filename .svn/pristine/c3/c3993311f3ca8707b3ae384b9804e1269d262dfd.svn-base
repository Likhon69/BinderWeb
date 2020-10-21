using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderWebContracts
{
    public interface IOrderHistoryRepository:IBinderBaseRepository<OrderHistoryDto>
    {
        ICollection<OrderHistoryDto> GetOrderHistory(string loginId);
    }
}
