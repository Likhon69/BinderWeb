using AutoMapper;
using BinderCore.Models.Message;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinderAppsApi.Configuration
{
    public class MobileAPiAutoMapper:Profile
    {
        public MobileAPiAutoMapper()
        {
            CreateMap<OrderRequestDto, ProductOrder>();
            CreateMap<ProductOrder, OrderRequestDto>();
            CreateMap<PaymentDto, PaymentOrder>();
            CreateMap<PaymentOrder, PaymentDto>();
            CreateMap<MessageEntityDto, Message>();
            CreateMap<MessageDetailsDto, MessageDetails>();
        }
    }
}
