using AutoMapper;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderWebContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderWebServices
{
    public class OrderHistoryServices:BinderBaseServices,IOrderHistoryServices
    {
        private readonly IOrderHistoryRepository _repository;
        private readonly IMapper _mapper;
        public OrderHistoryServices(IOrderHistoryRepository repository, IMapper mapper) 
        {
            _repository = repository;
            _mapper = mapper;
        }

        public ICollection<OrderHistoryDto> GetOrderHistory(string loginId)
        {
            
            var data = _repository.GetOrderHistory(loginId);

            return data;
        }
    }
}
