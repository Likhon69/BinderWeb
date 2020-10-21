using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Utilities
{
    public class ImageConverter
    {
        public byte[] GetByteImage(string singName)
        {
            FileStream fs = null;
            BinaryReader br;
            var systemPath = AppDomain.CurrentDomain.BaseDirectory;
            var fullPath = systemPath + "Images/Logo/" + singName;
            if (File.Exists(fullPath))
            {
                fs = new FileStream(fullPath, FileMode.Open);
            }
            br = new BinaryReader(fs);
            byte[] imgbyte = br.ReadBytes(Convert.ToInt32((fs.Length)));
            br.Close();
            fs.Close();
            return imgbyte;
        }

        public static String ConvertImageURLToBase64(String url)
        {
            StringBuilder _sb = new StringBuilder();

            Byte[] _byte = GetImage(url);

            _sb.Append(Convert.ToBase64String(_byte, 0, _byte.Length));

            return _sb.ToString();
        }

        private static byte[] GetImage(string url)
        {
            Stream stream = null;
            byte[] buf;

            try
            {
                WebProxy myProxy = new WebProxy();
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);

                HttpWebResponse response = (HttpWebResponse)req.GetResponse();
                stream = response.GetResponseStream();

                using (BinaryReader br = new BinaryReader(stream))
                {
                    int len = (int)(response.ContentLength);
                    buf = br.ReadBytes(len);
                    br.Close();
                }

                stream.Close();
                response.Close();
            }
            catch (Exception)
            {
                buf = null;
            }

            return (buf);
        }
    }
}