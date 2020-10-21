﻿using BinderUtility;
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
    public class UserDetailsRepository : BinderBaseRepository<Users>, IUserDetailsRepository
    {
        private ICommonConnection _connection;
        public UserDetailsRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }
        public UserDetailsDto GetUserDetails(string loginId)
        {
            string query = string.Format(@"Select Users.UserId,di.DealerId,di.DealerName,DealerCode,LoginId,MobileNo,
Users.EmailAddress,Users.UserName  from Users
 inner join DealerInformation di on di.DealerId=Users.EmployeeId where LoginId='{0}'", loginId);
            var dealer = new Data<UserDetailsDto>(_connection).SingleData(query);
            if (dealer != null && dealer.UserId > 0)
            {

                var location = new Data<LocationDto>(_connection).DataSource(@"
                    Select  Branch.BRANCHID as LocationId,BranchName as LocationName from  [DealerWithLocationMapping] dl
                    inner join Branch on Branch.BRANCHID = dl.LocationId
                    where DealerId = " + dealer.DealerId);

                dealer.Location = location;
                return dealer;
            }
            return null;
        }
    }
}