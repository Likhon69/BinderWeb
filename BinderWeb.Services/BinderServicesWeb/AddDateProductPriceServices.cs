using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using System;
using AutoMapper;
using System.Collections.Generic;
using System.Text;
using BinderUtility;
using BinderWeb.Repository.Base;
using CommonUnitOfWork;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class AddDateProductPriceServices : BinderBaseServices, IAddDateProductPriceServices
    {
       //private IAddDateProductPriceRepository _repository;
        private IMapper _mapper;
        public IUnitOfWork _unitOfWork;

        public AddDateProductPriceServices( IMapper mapper, IUnitOfWork unitOfWork) 
        {
          //  _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public string AddDateProductPrice(List<ProductPriceTemp> tmpProd, ProductPriceParam param)
        {


            string res = "";

            try
            {
               

                var data = _unitOfWork.ProductPriceTemp.GetProductPriceTemp(param);
                if (data != null)
                {
                    foreach (var item in tmpProd)
                    {
                        var tmpPrice = data.Find(s => s.PricingDate.Equals(item.PricingDate));
                        if (tmpPrice != null)
                        {
                            item.ProductPriceId = tmpPrice.ProductPriceId;
                            item.FirstSlotPrice = tmpPrice.FirstSlotPrice;
                            item.SecondSlotPrice = tmpPrice.SecondSlotPrice;
                        }
                    }
                    //_repository.Remove(item);
                }

                // _mapper.Map(tmpProd)

                foreach (var tmpPro in tmpProd)
                {
                    if (tmpPro.ProductPriceId == 0)
                    {
                        _unitOfWork.ProductPriceTemp.Add(tmpPro);
                    }
                    else
                    {
                        //var tmp = _mapper.Map<ProductPriceTemp>(tmpPro);

                        _unitOfWork.ProductPriceTemp.Update(tmpPro);
                    }
                }
                _unitOfWork.Commit();

                res = "Success";

            }
            catch (Exception ex)
            {

                res = ex.Message;
            }


            return res;
        }
    }
}
