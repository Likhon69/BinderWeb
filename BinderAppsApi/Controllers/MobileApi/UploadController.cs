using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

using System.Threading.Tasks;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.MobileApiDTO;
using BinderWeb.Services.BinderWebContracts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Hosting;

namespace BinderAppsApi.Controllers.MobileApi
{

    public class UploadController : BaseApiController
    {
        private IHostEnvironment _env;
        private IPaymentServices _paymentServices;
        public UploadController(IHostEnvironment env, IPaymentServices paymentServices)
        {
            _env = env;
            _paymentServices = paymentServices;
        }

        [HttpPost]
        public IActionResult PostAttachment(IFormFile File)
        {
            // var attachment = new Attachment();
            try
            {


                if (File != null)
                {
                    string path = "/UploadFile/" + DateTime.Now.Ticks.ToString() + new FileInfo(File.FileName).Extension.ToString();
                    var physicalPath = _env.ContentRootPath + path;
                    var stream = new FileStream(physicalPath, FileMode.Create,FileAccess.ReadWrite);
                    File.CopyTo(stream);
                    stream.Close();
                    stream.Dispose();

                    // attachment.AttachmentFile = path;
                    return Ok(new { File.FileName, File.Length, path });

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
            return NotFound();
        }

        [HttpGet]
        public IActionResult GetPaymentAttachmentFile(int id)
        {
            var objPay = _paymentServices.GetPaymentAttachmentFile(id);
            // string path = "/UploadFile/" + DateTime.Now.Ticks.ToString() + new FileInfo(File.FileName).Extension.ToString();

            var physicalPath = _env.ContentRootPath + objPay.AttachmentFile;
            var file = new FileInfo(physicalPath);
            if (System.IO.File.Exists(physicalPath))
            {
                string contentType = "";
               
                var provider =  new FileExtensionContentTypeProvider().TryGetContentType(physicalPath, out contentType);
              

                var stream = new FileStream(physicalPath, FileMode.Open);
               
              
                return File(stream, contentType, file.FullName);
            }
            return NotFound();
        }

    }
}
