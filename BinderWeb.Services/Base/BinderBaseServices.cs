﻿using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.Base
{
    public class BinderBaseServices : IBinderBaseServices
    {
        public BinderBaseServices()
        {

        }
        //private IBinderBaseRepository<T> _binderBaseRepository;
        //public BinderBaseServices(IBinderBaseRepository<T> binderBaseRepository)
        //{
        //    _binderBaseRepository = binderBaseRepository;
        //}
        //public bool Add(T entity)
        //{
        //    return _binderBaseRepository.Add(entity);
        //}

        //public ICollection<T> GetAll()
        //{
        //    return _binderBaseRepository.GetAll();
        //}

        //public T GetById(int id)
        //{
        //    return _binderBaseRepository.GetById(id);
        //}

        //public bool Remove(T entity)
        //{
        //    return _binderBaseRepository.Remove(entity);

        //}

        //public bool SaveChanges()
        //{
        //    return _binderBaseRepository.SaveChanges();
        //}

        //public bool Update(T entity)
        //{
        //    return _binderBaseRepository.Update(entity);
        //}
        //public UserDetailsDto GetUserDetails(string loginId)
        //{
        //    throw new NotImplementedException();
        //}
    }
}