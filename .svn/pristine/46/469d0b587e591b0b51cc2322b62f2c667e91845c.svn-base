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

    public class OrderController : BaseApiController
    {
        // GET: api/OrderRequest
        private IOrderRequestServices _orderRequestServices;
        private readonly IOrderHistoryServices _orderhistoryservices;

        public OrderController(IOrderRequestServices orderRequestServices, IOrderHistoryServices orderhistoryservices)
        {
            _orderRequestServices = orderRequestServices;
            _orderhistoryservices = orderhistoryservices;

        }
        //[HttpGet]
        //public IActionResult Get()
        //{
        //     var data = _orderRequestServices.GetAll();

        //    return Ok(data);
        //}
        [HttpPost]
        public IActionResult OrderRequest([FromBody] OrderRequestDto request)
        {
            try
            {
                return Ok(_orderRequestServices.OrderRequest(request));

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);

            }

        }

        [HttpGet]
        public ICollection<OrderHistoryDto> GetOrderHistory(string loginId)
        {
            return _orderhistoryservices.GetOrderHistory(loginId);


        }
    }
}
