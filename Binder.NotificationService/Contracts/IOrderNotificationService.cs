using Binder.NotificationService.Base;
using BinderWeb.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Binder.NotificationService.Contracts
{
    public interface IOrderNotificationService
    {
        bool SentOrderConfirmationNotificationToDealer(OrderMessageVm order);
        bool SendPaymentNotificationToAdmin(PaymentMessageVm payment);
        bool SendPaymentConfirmationNotificationToDealer(PaymentMessageVm payment);
        bool SendPaymentVarificationFailedNotificationToDealer(PaymentMessageVm payment);
        bool SendPaymentVarificationNotificationToDealer(PaymentMessageVm payment);

    }
}
