﻿using AutoMapper;
using BinderCore.Models.Message;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinderWebApi.Configuration
{
    public class WebAPiAutoMapper:Profile
    {
        public WebAPiAutoMapper()
        {
            CreateMap<ProductPriceTempVm, ProductPriceTemp>();
            CreateMap<ProductPriceTemp, ProductPriceTempVm>();
            CreateMap<ProductPriceTempVm, ProductPrice>();
            CreateMap<ProductPrice, ProductPriceTempVm>();
            CreateMap<ProductPrice, ProductPriceHistory>();
            CreateMap<ProductPriceHistory, ProductPrice>();
            CreateMap<DealerInformation, DealerInformationVm>();
            CreateMap<DealerInformationVm, DealerInformation>();
            CreateMap<MessageEntityDto, Message>();
            CreateMap<MessageDetailsDto, MessageDetails>();
            CreateMap<ProductOrderVm, ProductOrder>();
            CreateMap<ProductOrder, ProductOrderVm>();
            CreateMap<ProductOrderVm, PaymentOrder>();
            CreateMap<PaymentOrder, ProductOrderVm>();


            CreateMap<TallyPoint, TallyPointDto>();
            CreateMap<TallyPointDto, TallyPoint>();
        }
    }
}