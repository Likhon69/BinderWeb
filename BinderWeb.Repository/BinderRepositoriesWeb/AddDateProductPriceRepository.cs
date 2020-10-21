﻿    using BinderUtility;
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
    public class AddDateProductPriceRepository : BinderBaseRepository<ProductPriceTemp>, IAddDateProductPriceRepository
    {
        private ICommonConnection _connection;
        public AddDateProductPriceRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }
        public BinderDBContext context
        {
            get { return (BinderDBContext)_db; }
        }
        public List<ProductPriceTemp> GetProductPriceTemp(ProductPriceParam param)
        {
            return new Data<ProductPriceTemp>(_connection).DataSource(string.Format("Select * from ProductPriceTemp where PricingDate between '{0}' and '{1}' ", param.DatePickerFrom, param.DatePickerTo));
        }

       


    }
}