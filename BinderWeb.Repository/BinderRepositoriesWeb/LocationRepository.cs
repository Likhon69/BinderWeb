using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class LocationRepository:BinderBaseRepository<Branch>,ILocationRepository
    {
        private ICommonConnection _connection;
        public LocationRepository(DbContext db, ICommonConnection connection) :base(db)
        {
            _connection = connection;
        }

        public GridEntity<BranchDto> GetLocation(GridOptions options)
        {
            string data = string
                .Format(@"select BRANCHID,BRANCHCODE,BRANCHNAME from Branch");

            return new Kendo<BranchDto>.Grid(_connection).DataSource(options, data, "BRANCHID");
        }
    }
}
