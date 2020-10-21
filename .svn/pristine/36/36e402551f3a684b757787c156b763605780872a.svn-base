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
    public class TallySearchRepository : BinderBaseRepository<TallyPoint>, ITallySearchRepository
    {
        private ICommonConnection _connection;
        public TallySearchRepository(DbContext db, ICommonConnection connection) :base(db)
        {
            _connection = connection;
        }
        public ICollection<TallySearchDto> GetTallySearch(SocDto soc)
        {
            var quary = string.Format(@"select DealerInformation.DealerName,ProductOrder.OrderId,ProductOrder.Orderdate,ProductOrder.Quantity,PaymentOrder.ChequeNo,PaymentOrder.PaymentMethod,PaymentOrder.PaymentDate,OrderState.StateName as Status from ProductOrder
inner join DealerInformation on ProductOrder.DealerId = DealerInformation.DealerId
inner join PaymentOrder on ProductOrder.OrderId = PaymentOrder.OrderId
inner join OrderState on ProductOrder.StateId = OrderState.OrderStateId
where Soc = '{0}'", soc.SearchSoc);

            return new Data<TallySearchDto>(_connection).DataSource(quary);
        }

        public GridEntity<TallyPointDto> GetTallySummary(GridOptions options)
        {

            string data = string
               .Format(@"select  DisburseQuantity,OrderedQuantity,DeliveredQuantity,Remarks from TallyPoint;");

            return new Kendo<TallyPointDto>.Grid(_connection).DataSource(options, data, "DisburseQuantity");
        }
    }
}
