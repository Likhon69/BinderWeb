using AutoMapper;
using Binder.NotificationService.Contracts;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class OrderPaymentHistoryServices: BinderBaseServices,IOrderPaymentHistoryServices
    {
        private IOrderPaymentHistoryRepository _repository;
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper ;
        IOrderNotificationService _notification;
        public OrderPaymentHistoryServices(IOrderPaymentHistoryRepository repository, IUnitOfWork unitOfWork, IMapper mapper, IOrderNotificationService notification)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _notification = notification;
        }

        public GridEntity<OrderPaymentHistoryDto> GetOrderPaymentHistory(GridOptions options)
        {
            return _repository.GetOrderPaymentHistory(options);
        }

        public string SaveSocRemarks(ProductOrderVm socremrk)
        {
           
          
            var data = _mapper.Map<ProductOrder>(socremrk);
            var data1 = _mapper.Map<PaymentOrder>(socremrk);
            string res = "";
            try
            {
               
                if (data.OrderId != 0) {

                   /* var proData = _unitOfWork.Order.Single(c => c.OrderId == socremrk.OrderId);
                    proData.Soc = data.Soc;
                    proData.Remarks = data.Remarks;
                    proData.StateId = BinderUtility.Common.OrderState.PAYMENT_CONFIRM;
                    proData.SocConfirmationDate = DateTime.Now;*/
                   
                        var payConfirmMsg = GetPaymentConfirmationData(data);
                        _notification.SendPaymentConfirmationNotificationToDealer(payConfirmMsg);
                       
                    
                        _unitOfWork.Order.Update(data);
                _unitOfWork.Commit();
                res = "Success";
                }
            }
            catch(Exception ex)
            {
                res = ex.Message;
            }

            return res;
        }
        private PaymentMessageVm GetPaymentConfirmationData(ProductOrder payment)
        {
            var paymentMsg = new PaymentMessageVm();
            var data = _unitOfWork.DealerInformation.Single(c => c.DealerId == payment.DealerId);
            
            if (data != null)
            {
                paymentMsg.DealerName = data.DealerName;
                paymentMsg.OrderId = payment.OrderId;
                paymentMsg.Soc = payment.Soc??"";
            }
            return paymentMsg;
        }
    }
  
}
