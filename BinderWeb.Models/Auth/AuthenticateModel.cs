using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BinderWeb.Models.Auth
{
    public class AuthenticateModel
    {
        [Required]
        public string LoginId { get; set; }

        [Required]
        public string Password { get; set; }

        public string RedirectUrl { get; set; }
        public string Grant_Type { get; set; }



    }
}
