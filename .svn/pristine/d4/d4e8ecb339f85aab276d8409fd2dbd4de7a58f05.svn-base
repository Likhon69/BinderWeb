using AutoMapper;
using Binder.NotificationService.Contracts;
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
    public class PaymentServices : BinderBaseServices, IPaymentServices
    {
        private readonly IMapper _mapper;
        IPaymentRepository _repository;
        private IUnitOfWork _unitOfWork;
        IOrderNotificationService _notification;
        public PaymentServices(IPaymentRepository repository, IMapper mapper, IUnitOfWork unitOfWork, IOrderNotificationService notification)
        {
            _mapper = mapper;
            _repository = repository;
            _unitOfWork = unitOfWork;
            _notification = notification;
        }

        public PaymentOrder GetPaymentAttachmentFile(int id)
        {
            var data = _repository.GetById(id);

            return data;
        }

        public string PaymentPost(PaymentDto payment)
        {
            var data = _mapper.Map<PaymentOrder>(payment);
            string res = "";
            try
            {
                if (data.OrderId != 0)
                {
                    var orderData = _unitOfWork.Order.Single(c => c.OrderId == payment.OrderId);

                    orderData.StateId = BinderUtility.Common.OrderState.PAYMENT_VERIFICATION_PENDING;
               
                    data.PaymentDate = DateTime.Now;
                 
                    _unitOfWork.Payment.Add(data);
                    _unitOfWork.Order.Update(orderData);
                    var payPendingMsg = GetPaymentVerificationData(data);
                    _notification.SendPaymentVarificationNotificationToDealer(payPendingMsg);
                    _unitOfWork.Commit();

                    /*  _repository.Add(data);
                  _repository.SaveChanges();*/
                    res = "Success";
                }

            }
            catch(Exception ex)
            {
                res = ex.Message;
            }

            return res;
            
        }

        private PaymentMessageVm GetPaymentVerificationData(PaymentOrder payment)
        {
            var paymentMsg = new PaymentMessageVm();
            var data = _unitOfWork.Users.Single(c=>c.EmployeeId==payment.OrderId);
            if (data != null)
            {
                paymentMsg.DealerName = data.UserName;
                paymentMsg.OrderId = payment.OrderId ?? 0;
                paymentMsg.UserId = data.UserId;
            }
            return paymentMsg;
        }
    }
}
