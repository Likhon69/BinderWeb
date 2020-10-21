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
    public class BankBranchServices : BinderBaseServices, IBankBranchServices
    {
        private IBankBranchRepository _repository;
        public BankBranchServices(IBankBranchRepository repository)
        {
            _repository = repository;
        }
        public ICollection<BankBranch> GetBankBranch(int id)
        {
            var data = _repository.Get(c => c.BankId == id).ToList();

            return data;
        }
    }
}
