#pragma checksum "E:\Binder\Binder\BinderWeb\Views\OrderPaymentHistory\_OrderPaymentHistorySummary.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ad3e09f5e396a04c181b02ae2631e4b27521f758"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_OrderPaymentHistory__OrderPaymentHistorySummary), @"mvc.1.0.view", @"/Views/OrderPaymentHistory/_OrderPaymentHistorySummary.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "E:\Binder\Binder\BinderWeb\Views\_ViewImports.cshtml"
using BinderWeb;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "E:\Binder\Binder\BinderWeb\Views\_ViewImports.cshtml"
using BinderWeb.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ad3e09f5e396a04c181b02ae2631e4b27521f758", @"/Views/OrderPaymentHistory/_OrderPaymentHistorySummary.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d5d3090eaaa684f9340ce337a8792e30310f0915", @"/Views/_ViewImports.cshtml")]
    public class Views_OrderPaymentHistory__OrderPaymentHistorySummary : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            WriteLiteral("    <div");
            BeginWriteAttribute("class", " class=\"", 132, "\"", 140, 0);
            EndWriteAttribute();
            WriteLiteral(@">
        <fieldset class=""k-content"">

            <legend class=""k-fontSize[15]""> Order And Payment History</legend>

            <div id=""OrderNoSearchDiv"" class=""divDetails"">



                <div class=""input-group mb-2 mr-sm-2"">

                    <input type=""text"" class=""k-textbox"" id=""searchSoc"" placeholder=""Search SOC"">
                </div>


                <button type=""button"" id=""btnSearch"" class=""k-button k-primary mb-2"">Search</button>


            </div>
            <div id=""GetOrderPaymentHistoryList"" class=""divSummary"">



            </div>
        </fieldset>


    </div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
