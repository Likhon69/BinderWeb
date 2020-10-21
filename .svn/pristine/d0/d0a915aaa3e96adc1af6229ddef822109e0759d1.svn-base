using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BinderWeb.Services.BinderWebContracts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BinderWeb.Controllers
{
    [Route("api/Unit")]
    [EnableCors("CorsPolicy")]
    public class UnitController : Controller
    {
        // GET: api/<controller>
        private IUnitServices _unitServices;
        public UnitController(IUnitServices unitServices)
        {
            _unitServices = unitServices;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var units = _unitServices.GetUnits();
            return Ok(units);
        }
       
    }
}
