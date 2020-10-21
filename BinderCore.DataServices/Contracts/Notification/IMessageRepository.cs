﻿using BinderCore.DataServices.Base;
using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.DataServices.Contracts.Notification
{
    public interface IMessageRepository : ICoreBaseRepository<Message>
    {

    }
}
