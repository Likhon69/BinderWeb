using BinderUtility;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Repository.BinderRepositoriesWeb
{
    public class OrderPaymentHistoryRepository : BinderBaseRepository<OrderPaymentHistoryDto>, IOrderPaymentHistoryRepository
    {

        private ICommonConnection _connection;
        public OrderPaymentHistoryRepository(DbContext db, ICommonConnection connection) : base(db)
        {
            _connection = connection;
        }

        public GridEntity<OrderPaymentHistoryDto> GetOrderPaymentHistory(GridOptions options)
        {
            var query = string.Format(@"select ProductOrder.OrderId, ProductOrder.Orderdate,ProductOrder.UnitPrice,ProductOrder.Quantity,ProductOrder.TotalPrice,ProductOrder.PickupDate,
                        ProductOrder.OrderNo,ProductOrder.SOC,PaymentOrder.Amount,PaymentOrder.ChequeDate,PaymentOrder.ChequeNo,PaymentOrder.PaymentDate,PaymentOrder.DepositDate,PaymentOrder.PaymentMethod from ProductOrder 
                        inner join PaymentOrder on ProductOrder.OrderId = PaymentOrder.OrderId");

            return new Kendo<OrderPaymentHistoryDto>.Grid(_connection).DataSource(options, query, "PaymentDate desc");
        }
    }
}
