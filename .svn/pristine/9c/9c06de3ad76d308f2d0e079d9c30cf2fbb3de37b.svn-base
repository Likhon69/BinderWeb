using BinderCore.DataServices.Contracts.Notification;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.DataServices.Repositories.Notification
{
    public class EmailRepository : BinderBaseRepository<SentEmail>, IEmailRepository
    {
        DbContext _db;
        public EmailRepository(DbContext db) : base(db)
        {
            _db = db;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }

        }
    }
}
