using AutoMapper;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.BinderMobileContracts;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderMobileContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderWeb.Services.BinderMobileServices
{
    public class BankServices : BinderBaseServices, IBankServices
    {
        private IBankRepository _repository;

        private IMapper _mapper;
        public BankServices(IBankRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public ICollection<Bank> GetBankList()
        {
            var data = _repository.GetAll().ToList();
            //var bnkdata = _mapper.Map<Bank>(data);

            return data;
        }
    }
}
