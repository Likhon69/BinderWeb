﻿using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class DealerInformationRepository : BinderBaseRepository<DealerInformation>, IDealerInformationRepository
    {
        private ICommonConnection _connection;
        public DealerInformationRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }

        public void SaveDealer(DealerInformation dealer) {

            try
            {
                if (dealer.DealerId == 0)
                {
                    dealer.CreatedDate = DateTime.Now;
                    context.DealerInformation.Add(dealer);
                }
                else
                {
                    dealer.UpdatedDate = DateTime.Now;
                    var dealerMap = context.DealerWithLocationMapping.Where(s => s.DealerId == dealer.DealerId);
                    context.DealerWithLocationMapping.RemoveRange(dealerMap);
                    context.DealerInformation.Update(dealer);
                }


                // context.Database.BeginTransaction();
                //context.DealerInformation.Attach(dealer);
                // context.DealerWithLocationMapping.AddRange(dealer)
                //    context.Database
                context.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }




        }
        public GridEntity<DealerInformationVm> GetDealerInfo(GridOptions options)
        {
            string data = string
               .Format(@"select DealerId,DealerInformation.DealerName,DealerInformation.MobileNo,DealerInformation.EmailAddress,DealerType.DealerTypeName, DealerInformation.Agrementfile,DealerInformation.DealerTypeId,DealerInformation.DealerCode
from DealerInformation inner join DealerType on DealerInformation.DealerTypeId = DealerType.DealerTypeId");

            return new Kendo<DealerInformationVm>.Grid(_connection).DataSource(options, data, "DealerId");
        }

        public DealerInformationVm GetDealerUsers(string loginId)
        {
            string quary =
         string.Format(@"select DealerInformation.*,Users.UserId from DealerInformation 
			 inner join Users on Users.EmployeeId = DealerInformation.DealerId
			 where LoginId = {0}", loginId);
            return new Data<DealerInformationVm>(_connection).SingleData(quary);
        }
    }
}
