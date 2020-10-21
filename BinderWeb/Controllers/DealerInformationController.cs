﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace BinderWeb.Controllers
{
 
    public class DealerInformationController : Controller
    {
        private IWebHostEnvironment _env;
        public DealerInformationController(IWebHostEnvironment env)
        {
            _env = env;
        }
        public IActionResult AddDealerInformation()
        {
            return View();
        }
        [HttpPost]
        public IActionResult PostAttachment(List<IFormFile> files)
        {
            // var attachment = new Attachment();
            try
            {



                if (files != null)
                {
                    IFormFile File = files[0];
                    string fileName = DateTime.Now.Ticks.ToString() + new FileInfo(File.FileName).Extension.ToString();
                    string folder = "/UploadFile/";
                    var physicalPath = _env.WebRootPath + folder;
                    if (!Directory.Exists(physicalPath))
                    {
                        Directory.CreateDirectory(physicalPath);
                    }
                    string path = Path.Combine(physicalPath, fileName);
                    var stream = new FileStream(path, FileMode.Create, FileAccess.ReadWrite);
                    File.CopyTo(stream);
                    stream.Close();
                    stream.Dispose();
                    var webPath = folder + fileName;

                    // attachment.AttachmentFile = path;
                    return Ok(new { fileName, File.Length, path = webPath });

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
            return NotFound();
        }
        [HttpPost]
        public IActionResult RemoveAttachment(string[] fileNames)
        {
            // var attachment = new Attachment();
            try
            {



                if (fileNames != null)
                {
                    string fileName = fileNames[0];
                    string path = "/UploadFile/" + fileName;

                    //  string path = "/UploadFile/" + DateTime.Now.Ticks.ToString() + new FileInfo(File.FileName).Extension.ToString();
                    var physicalPath = _env.WebRootPath + path;

                    FileInfo file = new FileInfo(physicalPath);
                    file.Delete();

                    //var stream = new FileStream(physicalPath, FileMode.Create, FileAccess.ReadWrite);
                    //File.CopyTo(stream);
                    //stream.Close();
                    //stream.Dispose();

                    // attachment.AttachmentFile = path;
                    return Ok();

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
            return NotFound();
        }
    }
}