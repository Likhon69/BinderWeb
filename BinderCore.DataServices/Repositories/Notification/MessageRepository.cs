using BinderCore.DataServices.Contracts.Notification;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.DataServices.Repositories.Notification
{
    public class MessageRepository : BinderBaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(DbContext db) : base(db)
        {
        }
    }
}
