using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.BinderWebContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinderAppsApi.Controllers.MobileApi
{
            
    public class PaymentController : BaseApiController
    {
      
        private readonly IPaymentServices _paymentServices;

        public PaymentController(IPaymentServices paymentServices)
        {
          
            _paymentServices = paymentServices;
        }
        // GET: api/Payment
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

     [HttpPost]
      public IActionResult PaymentPost([FromBody] PaymentDto payment)
      {
          
            return Ok(_paymentServices.PaymentPost(payment));
      }
    }
}
