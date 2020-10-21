using AutoMapper;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class AddDateProductPriceApproveServices : BinderBaseServices, IAddDateProductPriceApproveServices
    {
       /* private IAddDateProductPriceApproveRepository _repository;
        private IAddDateProductPriceRepository _repositoryForProductTemp;
        private IAddProductPriceHistoryRepository _repositoryForProductPriceHistory;*/
        private IUnitOfWork _unitOfWork;
        IMapper _mapper;
        public AddDateProductPriceApproveServices(IUnitOfWork unitOfWork, IMapper mapper)
        {
            //_repository = repository;
            //_repositoryForProductTemp = repositoryForProductTemp;
            _mapper = mapper;
           // _repositoryForProductPriceHistory = repositoryForProductPriceHistory;
            _unitOfWork = unitOfWork;
        }



        public string AddProductPriceApprove(List<int> listProduct, Users user)
        {
            string res = "";
            try
            {
                
                var data = _unitOfWork.ProductPrice.DateProductPriceApprove(listProduct);

                if (data != null)
                {
                    foreach (var item in data)
                    {
                        //var removeData = _mapper.Map<ProductPriceTemp>(item);
                        var apPro = _unitOfWork.ProductPrice.SingleOrDefault(c => c.PricingDate.Equals(item.PricingDate));
                        

                        if (apPro != null)
                        {
                            var histry = _mapper.Map<ProductPriceHistory>(apPro);
                            histry.ProductPriceId = 0;
                            histry.ApproveBy = user.UserId;
                            histry.ApproveDate = DateTime.Now;
                            histry.CreateDate = DateTime.Now;
                            histry.CreateBy= user.UserId;
                            _unitOfWork.ProductPriceHistory.Add(histry);

                            apPro.FirstSlotPrice = item.FirstSlotPrice;
                            apPro.SecondSlotPrice = item.SecondSlotPrice;
                            apPro.ProductName = item.ProductName;
                            apPro.PricingDate = item.PricingDate;
                            apPro.ApproveBy = user.UserId;
                            apPro.ApproveDate = DateTime.Now;
                            apPro.CreateBy = user.UserId;
                            apPro.CreateDate = DateTime.Now;
                            // context.ProductPrice.Update(apPro);
                            _unitOfWork.ProductPrice.Update(apPro);




                        }
                        else
                        {
                            var newItem = _mapper.Map<ProductPrice>(item);
                            newItem.CreateDate = DateTime.Now;
                            newItem.CreateBy = user.UserId;
                            newItem.ApproveBy = user.UserId;
                            newItem.ApproveDate = DateTime.Now;
                            newItem.ProductPriceId = 0;

                           _unitOfWork.ProductPrice.Add(newItem);

                        }
                        res = "Success";
                        _unitOfWork.ProductPriceTemp.Remove(item.ProductPriceId);
                    }

                }
            }
            catch(Exception ex)
            {
                res = ex.Message;
            }


            //  var data2 = _repository.DeleteProductPriceTemp(listProduct);

            _unitOfWork.Commit();
            return res;
        }
    }
}
