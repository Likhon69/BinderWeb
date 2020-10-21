using AutoMapper;
using BinderUtility;
using BinderUtility.Common;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Repository.BinderWebContracts;
using BinderWeb.Services.BinderContractsWeb;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class TallySearchServices : ITallySearchServices
    {
        //private ITallySearchRepository _repository;
        private IMapper _mapper;
        private IOrderRequestRepository _orderRequestRepository;
        private IUnitOfWork _unitOfWork;
        public TallySearchServices(IUnitOfWork unitOfWork, IMapper mapper, IOrderRequestRepository orderRequestRepository)
        {
            //_repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;

            _orderRequestRepository = orderRequestRepository;
        }
        public ICollection<TallySearchDto> GetTallySearch(SocDto soc)
        {
            return _unitOfWork.TallyPoint.GetTallySearch(soc);
        }

        public GridEntity<TallyPointDto> GetTallySummary(GridOptions options)
        {
            return _unitOfWork.TallyPoint.GetTallySummary(options);
        }

        public string PostQuantity(TallyPointDto tally)
        {

            
            string res = "";
            int stateId = 0;
            if (tally.BalanceQty == 0)
            {
                stateId = BinderUtility.Common.OrderState.DELIVERY_COMPLETED;
            }
            else
            {
                stateId = BinderUtility.Common.OrderState.PARTIAL_DELIVERY;

            }

            var data = _mapper.Map<TallyPoint>(tally);
            try
            {
                var order = _orderRequestRepository.SingleOrDefault(c => c.OrderId == tally.OrderId);

                order.StateId = stateId;
                _orderRequestRepository.Update(order);


                _unitOfWork.TallyPoint.Add(data);
                _unitOfWork.Commit();
                _orderRequestRepository.SaveChanges();
                res = "Succes";
            }
            catch (Exception ex)
            {
                res = ex.Message;
            }
            return res;
           
        }
    }
}
