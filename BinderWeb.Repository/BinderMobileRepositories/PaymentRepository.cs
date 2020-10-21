using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderWebContracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderWebRepositories
{
    public class PaymentRepository:BinderBaseRepository<PaymentOrder>,IPaymentRepository
    {
        public PaymentRepository(DbContext db):base(db)
        {

        }
    }
}
