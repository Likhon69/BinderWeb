using BinderCore.DataServices.Base;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.Models.SystemAdmin;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.DataServices.SystemAdmin.DataServices
{
    public class UsersRepository : CoreBaseRepository<Users>,IUsersRepository
    {
        ICommonConnection _connection;
        public UsersRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }


        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }

        public UsersDto GetMessageUserByUserId(int hrRecordId)
        {
            string quary =
             string.Format(@"Select di.DealerId, Users.UserId,Users.UserName,case when isnull(Di.EmailAddress,'')='' then  Users.EmailAddress else Di.EmailAddress end EmailAddress,di.DealerName,di.DealerId,di.MobileNo from Users
left join DealerInformation di on di.DealerId=Users.EmployeeId where Users.UserId={0}", hrRecordId);
            return new Data<UsersDto>(_connection).SingleData(quary);
        }

        public GridEntity<UsersDto> GetUserSummary(GridOptions options)
        {
            string quary =
              string.Format(@"Select Users.*,di.DealerName,di.DealerId from Users
left join DealerInformation di on di.DealerId=Users.EmployeeId", "");
            return new Kendo<UsersDto>.Grid(_connection).DataSource(options, quary, " UserName ");
        }

      
    }
}
