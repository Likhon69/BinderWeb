﻿using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderContractsWeb
{
    public interface ITallySearchRepository:IBinderBaseRepository<TallyPoint>
    {
        ICollection<TallySearchDto> GetTallySearch(SocDto soc);
        GridEntity<TallyPointDto> GetTallySummary(GridOptions options);
    }
}
