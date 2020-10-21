using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderMobileContracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderMobileRepositories
{
    public class BankRepository:BinderBaseRepository<Bank>,IBankRepository
    {
        public BankRepository(DbContext db):base(db)
        {

        }
    }
}
