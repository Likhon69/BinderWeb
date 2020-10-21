using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderWebContracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderWebRepositories
{
    public class OrderRequestRepository:BinderBaseRepository<ProductOrder>,IOrderRequestRepository
    {
        public OrderRequestRepository(DbContext db):base(db)
        {

        }
    }
}
