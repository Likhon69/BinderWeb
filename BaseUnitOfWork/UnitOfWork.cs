﻿using BinderCore.DataServices.Contracts.Notification;
using BinderCore.DataServices.Contracts.SystemAdmin;
using BinderCore.DataServices.Repositories.Notification;
using BinderCore.DataServices.Repositories.SystemAdmin;
using BinderCore.DataServices.SystemAdmin.Contracts;
using BinderCore.DataServices.SystemAdmin.DataServices;
using BinderUtility;
using BinderWeb.Repository.Base;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Repository.BinderRepositoriesWeb;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Repository.BinderWebRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace CommonUnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        private bool _disposed;
        private Hashtable _repositories;
        ICommonConnection _connection;
        public int Commit()
        {
            return _context.SaveChanges();
        }
        public UnitOfWork(DbContext context, ICommonConnection connection)
        {
            _context = context;
            _connection = connection;
        }


        public IBinderBaseRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null)
            {
                _repositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;

            if (_repositories.ContainsKey(type))
            {
                return (IBinderBaseRepository<TEntity>)_repositories[type];
            }

            var repositoryType = typeof(BinderBaseRepository<>);

            _repositories.Add(type, Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context));

            return (IBinderBaseRepository<TEntity>)_repositories[type];
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _context.Dispose();
                if (_repositories != null)
                {
                    foreach (IDisposable repository in _repositories.Values)
                    {
                        repository.Dispose();
                    }
                }
            }
            _disposed = true;
        }

        public IAddDateProductPriceApproveRepository AddDateProductPriceApproveRepository<ProductPrice>()
        {
            IAddDateProductPriceApproveRepository repo;
            repo = new AddDateProductPriceApproveRepository(_context, _connection);
            return repo;
        }



        private IAddDateProductPriceApproveRepository _AddDateProductPriceApproveRepository;

        private IAddDateProductPriceRepository _ProductPriceTemp;
        public IAddDateProductPriceRepository ProductPriceTemp
        {
            get
            {
                return _ProductPriceTemp ?? (_ProductPriceTemp = new AddDateProductPriceRepository(_context, _connection));

            }
        }

        public IAddDateProductPriceApproveRepository ProductPrice
        {
            get
            {
                return _AddDateProductPriceApproveRepository ?? (_AddDateProductPriceApproveRepository = new AddDateProductPriceApproveRepository(_context, _connection));

            }

        }


        IProductInformationRepository _ProductInformation;
        public IProductInformationRepository ProductInformation => _ProductInformation ?? new ProductInformationRepository(_context, _connection);

        IAddProductPriceHistoryRepository _ProductPriceHistory;
        public IAddProductPriceHistoryRepository ProductPriceHistory => _ProductPriceHistory ?? new AddProductPriceHistoryRepository(_context, _connection);

        IDealerTypeRepository _DealerType;
        public IDealerTypeRepository DealerType => _DealerType ?? new DealerTypeRepository(_context, _connection);
        IDealerWithLocationMappingRepository _DealerWithLocationMapping;
        public IDealerWithLocationMappingRepository DealerWithLocationMapping => _DealerWithLocationMapping ?? new DealerWithLocationMappingRepository(_context);
        ILocationRepository _Location;
        public ILocationRepository Location => _Location ?? new LocationRepository(_context, _connection);
        IUnitRepository _Unit;
        public IUnitRepository Unit => _Unit ?? new UnitRepository(_context);
        IEmailContentRepository _EmailContent;
        public IEmailContentRepository EmailContent => _EmailContent ?? new EmailContentRepository(_context);
        IMessageRepository _Message;
        public IMessageRepository Message => _Message ?? new MessageRepository(_context);
        IEmailRepository _SentEmail;

        public IEmailRepository Email => _SentEmail ?? new EmailRepository(_context);
        ISmsRepository _Smssent;

        public ISmsRepository SMS => _Smssent ?? new SmsRepository(_context);

        IDealerInformationRepository _DealerInformation;
        public IDealerInformationRepository DealerInformation => _DealerInformation ?? new DealerInformationRepository(_context, _connection);

        ITallySearchRepository _TallyPoint;
        public ITallySearchRepository TallyPoint => _TallyPoint ?? new TallySearchRepository(_context, _connection);

        IUsersRepository _users;
 
        public IUsersRepository Users => _users ?? new UsersRepository(_context,_connection);

        IUserOtpRepository _UserOtp;
        public IUserOtpRepository UserOtp => _UserOtp ?? new UserOtpRepository(_context);

        IGroupMemberRepository _GroupMember; 
        public IGroupMemberRepository GroupMember => _GroupMember ?? new GroupMemberRepository(_context);
        IGroupRepository _Group;
        public IGroupRepository Group => _Group ?? new GroupRepository(_context);

        IOrderRequestRepository _Order;
        public IOrderRequestRepository Order => _Order ?? new OrderRequestRepository(_context);

        IPaymentRepository _Payment;
        public IPaymentRepository Payment => _Payment?? new PaymentRepository(_context);
    }
}
