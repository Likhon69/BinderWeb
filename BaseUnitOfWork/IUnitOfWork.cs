﻿using BinderCore.DataServices.Contracts.Notification;
using BinderCore.DataServices.Contracts.SystemAdmin;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Repository.BinderRepositoriesWeb;
using BinderWeb.Repository.BinderWebContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace CommonUnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {

        //IBinderBaseRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        IAddDateProductPriceApproveRepository ProductPrice { get; }
        IAddDateProductPriceRepository ProductPriceTemp { get; }
        IProductInformationRepository ProductInformation { get; }
        IAddProductPriceHistoryRepository ProductPriceHistory { get; }
        IDealerTypeRepository DealerType { get; }
        IDealerWithLocationMappingRepository DealerWithLocationMapping { get; }
        ILocationRepository Location { get; }
        IUnitRepository Unit { get; }
        IEmailContentRepository EmailContent { get; }
        IMessageRepository Message { get; }
        IEmailRepository Email { get; }
        ISmsRepository SMS { get; }
        IUsersRepository Users { get; }
        IDealerInformationRepository DealerInformation { get; }
        ITallySearchRepository TallyPoint { get; }
        IUserOtpRepository UserOtp { get; }
        IGroupMemberRepository GroupMember{ get; }
        IGroupRepository Group{ get; }

        IOrderRequestRepository Order { get; }
        IPaymentRepository Payment { get; }

        int Commit();
    }
}