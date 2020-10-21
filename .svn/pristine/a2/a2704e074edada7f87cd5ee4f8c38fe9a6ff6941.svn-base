using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Utilities
{
    public class HtmlConvertion
    {
        public static string GetPlainTextFromHtml(string htmlString)
        {
            string htmlTagPattern = "<.*?>";
            var regexCss = new Regex("<[^>]*>");
            htmlString = regexCss.Replace(htmlString, string.Empty);
           // htmlString = Regex.Replace(htmlString, htmlTagPattern, string.Empty);
           // htmlString = Regex.Replace(htmlString, @"^\s+$[\r\n]*", "", RegexOptions.Multiline);
            //htmlString = htmlString.Replace(" ", string.Empty);

            return htmlString;
        }
    }
}
