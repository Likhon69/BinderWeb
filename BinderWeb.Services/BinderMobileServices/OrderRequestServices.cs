
using AutoMapper;
using Binder.NotificationService.Contracts;
using BinderUtility.Common;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderWebContracts;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebServices
{
    public class OrderRequestServices : BinderBaseServices, IOrderRequestServices
    {
        private readonly IMapper _mapper;
        IUnitOfWork _unitofWork;
        IOrderNotificationService _notification;
        public OrderRequestServices(IUnitOfWork unitofWork, IOrderNotificationService notification, IMapper mapper)
        {
            _mapper = mapper;
            _unitofWork = unitofWork;
            _notification = notification;
        }

        public string OrderRequest(OrderRequestDto request)
        {
            string res = "";

            try
            {
                if (request.OrderId == 0)
                {
                    var deExist = _unitofWork.DealerInformation.GetById(request.DealerId);
                    if (deExist == null)
                    {
                        throw new Exception("Dealer ID not found");
                    }

                    var data = _mapper.Map<ProductOrder>(request);

                    data.Orderdate = DateTime.Now;
                     data.TotalPrice = request.Quantity * request.UnitPrice;
                    data.StateId = BinderUtility.Common.OrderState.ORDER_CONFIRMATION_PENDING;
                    var order = _unitofWork.Order.Save(data);
                    var OrderMsg = GetOrderMessageObject(order);
                    if (_notification.SentOrderConfirmationNotificationToDealer(OrderMsg))
                    {
                        order.StateId = BinderUtility.Common.OrderState.ORDER_CONFIRM;
                        order.OrderNo = OrderMsg.OrderNo;
                        _unitofWork.Order.Update(order);
                        _unitofWork.Commit();
                        res = "Success";
                    }
                    else
                    {
                        res = "Failed";

                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        private OrderMessageVm GetOrderMessageObject(ProductOrder order)
        {
            var msgModel = new OrderMessageVm();
            var location = _unitofWork.Location.GetById(order.LocationId ?? 0);
            if (location != null)
            {
                var user = _unitofWork.Users.Single(s => s.EmployeeId == order.DealerId);

                var fistLetter = location.BranchCode.Substring(0, 1);
                var random = new Random().Next(1000000, 9999999);
                msgModel.OrderNo = fistLetter + random.ToString();
                msgModel.LocationName = location.BranchName;
                msgModel.DealerName = user.UserName;
                msgModel.OrderId = order.OrderId;
                msgModel.UserId = user.UserId;
                msgModel.OrderDate = order.Orderdate ?? DateTime.Now;

            }

            return msgModel;
        }
    }
}
