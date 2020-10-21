﻿using AutoMapper;
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
    public class DealerInformationServices : BinderBaseServices, IDealerInformationServices
    {
     /*   private IDealerInformationRepository _repository;
           //  private IDealerInformationRepository _repository;
           private IDealerWithLocationMappingRepository _rapositoryMapping;*/
        public IUnitOfWork _unitOfWork;

        private IMapper _mapper;
        public DealerInformationServices( IMapper mapper, IUnitOfWork unitOfWork)
        {
            //_repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            //_rapositoryMapping = rapositoryMapping;
        }
        public string AddDealerInformation(DealerInformationVm entity)
        {
            
            string res = "";
            try
            {
                // DealerInformation obj = new DealerInformation();
                //if (entity.DealerId == 0)
                //{
                var obj = _mapper.Map<DealerInformation>(entity);
                var locationList = new List<DealerWithLocationMapping>();

                if (entity.SelectedtItems != null)
                {
                    // var locationMapping = _repository.Get(s => s.DealerId == obj.DealerId);

                    foreach (var id in entity.SelectedtItems)
                    {
                        var loc = new DealerWithLocationMapping();

                        var existData = _unitOfWork.DealerWithLocationMapping.SingleOrDefault(s => s.DealerId == obj.DealerId && s.LocationId == id);
                        if (existData != null)
                        {
                            loc.DealerWithLocationMappingId = existData.DealerWithLocationMappingId;
                            loc.DealerId = existData.DealerId;
                        }
                        else
                        {
                            loc.DealerWithLocationMappingId = 0;
                            loc.DealerId = 0;
                        }
                        
                            loc.LocationId = id;
                            locationList.Add(loc);
                        
                      

                    }
                    obj.DealerWithLocationMapping = locationList;
                }




                //}
                //else
                //{
                //    var obj = _mapper.Map<DealerInformation>(entity);
                //    var locationList = new List<DealerWithLocationMapping>();

                //    var locationMapping = _repository.Get(s => s.DealerId == obj.DealerId);
                //    if (locationMapping != null)
                //        foreach (var item in locationMapping)
                //        {

                //        }

                //    if (entity.SelectedtItems != null)
                //    {
                //        foreach (var id in entity.SelectedtItems)
                //        {
                //            var loc = new DealerWithLocationMapping();
                //            loc.LocationId = id;
                //            loc.DealerId = obj.DealerId;
                //            locationList.Add(loc);

                //        }
                //        obj.DealerWithLocationMapping = locationList;
                //    }
                //_repository.Update(obj);

                //}

                //  _repository.SaveChanges();
                //_UnitOfWork.SaveDealer(obj);
               // _unitOfWork.Commit();
                _unitOfWork.DealerInformation.SaveDealer(obj);
                res = "Success";

            }
            catch (Exception ex)
            {

                res = ex.Message;
            }
            return res;
        }

        public GridEntity<DealerInformationVm> GetDealerInfo(GridOptions options)
        {
            //return _repository.GetDealerInfo(options);
            return _unitOfWork.DealerInformation.GetDealerInfo(options);
        }

        public IQueryable<DealerWithLocationMapping> GetDealerLocationMapping(int dealerId)
        {
            return _unitOfWork.DealerWithLocationMapping.Get(s => s.DealerId == dealerId).AsQueryable();
        }

        public List<DealerInformation> GetDealers()
        {
            return _unitOfWork.DealerInformation.GetAll().ToList();
        }
    }
}