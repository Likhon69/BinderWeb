using BinderUtility;
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
    public class ProductInformationServices : BinderBaseServices, IProductInformationServices
    {
        private IProductInformationRepository _repository;
        private IUnitOfWork _unitOfWork;
        public ProductInformationServices(IProductInformationRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
           _unitOfWork = unitOfWork;
        }

        public string AddProductInformation(ProductInformation product)
        {
            string res = "";
            try
            {
                if (product.ProductId == 0)
                {
                    _unitOfWork.ProductInformation.Add(product);
                }
                else
                {
                    _unitOfWork.ProductInformation.Update(product);

                }
                _unitOfWork.Commit();
                res = "Success";
            }
            catch(Exception ex)
            {
                res = ex.Message;
            }
            return res;
          
        }

        public GridEntity<ProductInformationVm> GetProductInfoSummary(GridOptions options)
        {
            return _unitOfWork.ProductInformation.GetProductInfoSummary(options);
        }


    }
}
