#pragma checksum "E:\Binder\Binder\BinderWeb\Views\ProductInformation\_ProductsinfoDetails.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a8c6a08db096ef06178a980ce3077633306bcd52"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_ProductInformation__ProductsinfoDetails), @"mvc.1.0.view", @"/Views/ProductInformation/_ProductsinfoDetails.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a8c6a08db096ef06178a980ce3077633306bcd52", @"/Views/ProductInformation/_ProductsinfoDetails.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d5d3090eaaa684f9340ce337a8792e30310f0915", @"/Views/_ViewImports.cshtml")]
    public class Views_ProductInformation__ProductsinfoDetails : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            WriteLiteral(@"
<!-- Default form login -->
<div class=""rightDiv"">
    <div class=""k-block"">
        <h3 class=""k-header""> Products Details</h3>

        <div id=""ProductInformationDiv"" class=""divDetails"">

            <ul>
                <li>
                    <input id=""hdnProductsId"" Type=""hidden"" value=""0"" />
                </li>
                <li>
                    <label class=""lbl widthSize20_per"">Product Name:</label>
                    <input type=""text"" class=""k-textbox"" id=""txtProductName"" name=""ProductName"" title=""Please Select Your Name"" required validationMessage=""Enter Product Name!""  />


                </li>


                <li>
                    <label class=""lbl widthSize20_per"">Product Code:</label>
                    <input type=""text"" class=""k-textbox"" id=""txtProductCode"" name=""ProductCode"" title=""Please Select Your Name"" required validationMessage=""Enter Product Code""  />

                </li>



                <li>
                    <label for=""txtProdu");
            WriteLiteral(@"ctUnitName"" class=""lbl widthSize20_per"">Unit Name:</label>
                    <input id=""txtProductUnitName"" required data-required-msg=""Select Product Type Name"" />

                </li>
                <li class=""accept"">
                    <button id=""btnSave"" class=""k-button k-primary"" type=""submit"">Submit</button>
                    &nbsp;&nbsp;
                    <button id=""btnClearAll"" class=""k-button k-primary"">Clear All</button>
                </li>
                <li class=""status""></li>








            </ul>


        </div>


    </div>

</div>
<!-- Default form login -->
");
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
