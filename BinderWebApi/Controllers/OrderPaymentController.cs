using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BinderUtility;
using BinderWeb.Models.ViewModels;
using BinderWeb.Services.BinderContractsWeb;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderWebApi.Controllers
{

    public class OrderPaymentController : BaseApiController
    {
        private IOrderPaymentHistoryServices _orderPaymentHistoryServices;
        public OrderPaymentController(IOrderPaymentHistoryServices orderPaymentHistoryServices)
        {
            _orderPaymentHistoryServices = orderPaymentHistoryServices;
        }

        [HttpPost]
        public IActionResult GetOrderPaymentHistory(GridOptions options)
        {
            return Ok(_orderPaymentHistoryServices.GetOrderPaymentHistory(options));
        }

        [HttpPost]
        public IActionResult SaveSocRemarks(ProductOrderVm socremrk)
        {
            return Ok(_orderPaymentHistoryServices.SaveSocRemarks(socremrk));
        }
    }
}
