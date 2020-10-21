using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Security
{
    public class RandomOTPGenerator
    {
        public static string GetOTP()
        {
            Random generator = new Random();
            String r = generator.Next(100000, 999999).ToString("D6");
            return r;
        }
    }
}
