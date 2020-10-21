using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class DealerWithLocationMappingRepository:BinderBaseRepository<DealerWithLocationMapping>,IDealerWithLocationMappingRepository
    {
        public DealerWithLocationMappingRepository(DbContext db):base(db)
        {

        }
    }
}
