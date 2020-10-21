using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.ViewModels;
using BinderWeb.Repository.BinderContractsWeb;
using BinderWeb.Services.Base;
using BinderWeb.Services.BinderContractsWeb;
using CommonUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BinderWeb.Services.BinderServicesWeb
{
    public class ProductPriceServices : BinderBaseServices, IProductPriceServices
    {
        private IProductPriceRepository _repository;
        private ICommonConnection _connection;
        private IUnitOfWork _unitOfWork;
        public ProductPriceServices(IProductPriceRepository repository, IUnitOfWork unitOfWork, ICommonConnection connection)
        {
            _repository = repository;
            _connection = connection;
            _unitOfWork = unitOfWork;
        }
        public GridEntity<ProductPrice> GetProductPriceList(GridOptions options)
        {
            /*string query = "";

            var data = _repository.GetAll().ToList();
            //string combindedString = string.Join(",", data);
            
            foreach (var item in data)
            {
                query += item.ToString() + ",";
            }
            if (query != "")
            {
                query = query.Remove(query.Length - 1, 1);
            }*/
            return _repository.GetProductPriceList(options);

           
        }
    }
}
