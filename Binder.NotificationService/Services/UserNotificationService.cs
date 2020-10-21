using AutoMapper;
using Binder.NotificationService.Base;
using Binder.NotificationService.Contracts;
using Binder.NotificationService.Model;
using BinderCore.DataServices.Contracts.Notification;
using BinderCore.Models.Message;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Binder.NotificationService.Services
{
    public class UserNotificationService : BaseNotification, IUserNotificationService
    {
        IUnitOfWork _unitOfWork;

        public UserNotificationService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _unitOfWork = unitOfWork;
        }
        public bool SentOtp(OtpMessageDto obj)
        {
            var messgeg = BuildOTPMessage(obj);
            return base.SentMessage(messgeg);
        }

        public void SendPasswordChangedAcknowledge(Users userOtp)
        {
            var messgeg = BuildAcknowldegeMessage(userOtp);
            base.SentMessage(messgeg);
        }

        private MessageEntityDto BuildAcknowldegeMessage(Users user)
        {
            MessageEntityDto message = null;
            int emailTitleId = 202;


            EmailContent emailContent = _unitOfWork.EmailContent.GetContentByTitleId(emailTitleId);

            if (emailContent.EmailBody != null)
            {

                message = new MessageEntityDto();
                message.SMSText = string.Format(emailContent.Smsbody);
                message.NotificationText = string.Format(emailContent.NotifcationBody);
                message.FromHrRecordId = 1;
                message.ToMessageDetails = base.BuildToMessageDetails(user.UserId);
                //message.CcMessageDetails = BuildCcMessageDetails();
                message.MessageSubject = string.Format(emailContent.EmailSubject);
                message.MessageDetails = string.Format(emailContent.EmailBody, user.UserName);
                message.MessagingDate = DateTime.Now;
                message.ReferenceId = user.UserId;
                message.ReferenceType = 1;
                //  message.MenuId = _messageService.MenuId;
                message.ModuleId = 1;
                message.RedirectLink = "";
                message.ReferenceDate = DateTime.Now;
                message.EmailTitleId = emailContent.EmailTitleId ?? 0;
                message.EmailNotificationTypeId = 2;
                message.ArchiveTime = (DateTime?)null;
            }
            return message;
        }


        internal MessageEntityDto BuildOTPMessage(OtpMessageDto delar)
        {
            MessageEntityDto message = null;
            int emailTitleId = 201;


            EmailContent emailContent = _unitOfWork.EmailContent.GetContentByTitleId(emailTitleId);

            if (emailContent.EmailBody != null)
            {

                message = new MessageEntityDto();
                message.SMSText = string.Format(emailContent.Smsbody, delar.OTP, delar.ValidMinutes);
                message.NotificationText = string.Format(emailContent.NotifcationBody, delar.UserName, delar.OTP, delar.ValidMinutes);
                message.FromHrRecordId = 1;
                message.ToMessageDetails = base.BuildToMessageDetails(delar.UserId);
                //message.CcMessageDetails = BuildCcMessageDetails();
                message.MessageSubject = string.Format(emailContent.EmailSubject);
                message.MessageDetails = string.Format(emailContent.EmailBody, delar.UserName, delar.OTP, delar.ValidMinutes);
                message.MessagingDate = DateTime.Now;
                message.ReferenceId = delar.UserOtpId;
                message.ReferenceType = 1;
                //  message.MenuId = _messageService.MenuId;
                message.ModuleId = 1;
                message.RedirectLink = "";
                message.ReferenceDate = delar.GenerateTime;
                message.EmailTitleId = emailContent.EmailTitleId ?? 0;
                message.EmailNotificationTypeId = 2;
                message.ArchiveTime = (DateTime?)null;
            }
            return message;
        }


    }
}
