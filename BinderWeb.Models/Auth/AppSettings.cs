using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audiance { get; set; }

    }
}
