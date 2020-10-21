using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Services.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebContracts
{
    public interface IUnitServices : IBinderBaseServices
    {
        List<Unit> GetUnits();
    }
}
