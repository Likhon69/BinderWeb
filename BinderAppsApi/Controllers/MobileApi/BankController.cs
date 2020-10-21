using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BinderWeb.Services.BinderMobileContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderAppsApi.Controllers.MobileApi
{
    
    public class BankController : BaseApiController
    {
        private IBankServices _bankServices;
        private IBankBranchServices _bankBranchServices;
  

        public BankController(IBankServices bankServices, IBankBranchServices bankBranchServices)
        {
            _bankServices = bankServices;
            _bankBranchServices = bankBranchServices;
        }

        [HttpGet]
        public IActionResult GetBankList()
        {
            return Ok(_bankServices.GetBankList());
        }
        [HttpGet]
        public IActionResult GetBankBranch(int id)
        {
            return Ok(_bankBranchServices.GetBankBranch(id));
        }
    }
}
