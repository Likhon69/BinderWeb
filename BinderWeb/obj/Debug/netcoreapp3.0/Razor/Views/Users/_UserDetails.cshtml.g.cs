#pragma checksum "E:\Binder\Binder\BinderWeb\Views\Users\_UserDetails.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ba82235be31b90ee8dfce5c594d4756016232ca7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Users__UserDetails), @"mvc.1.0.view", @"/Views/Users/_UserDetails.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ba82235be31b90ee8dfce5c594d4756016232ca7", @"/Views/Users/_UserDetails.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d5d3090eaaa684f9340ce337a8792e30310f0915", @"/Views/_ViewImports.cshtml")]
    public class Views_Users__UserDetails : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@" 

<div class=""rightDiv widthSize34_per"">
    <fieldset class=""k-content"">
        <legend class=""k-fontSize[15]"">User Details</legend>

        <div id=""tabstrip"">
            <ul>
                <li class=""k-state-active"">
                    User Info
                </li>
                <li>
                    Group Membership
                </li>
                
            </ul>
            <div>
                
                ");
#nullable restore
#line 19 "E:\Binder\Binder\BinderWeb\Views\Users\_UserDetails.cshtml"
           Write(await Html.PartialAsync("_UserInfo.cshtml"));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            </div>\r\n            <div>\r\n                ");
#nullable restore
#line 22 "E:\Binder\Binder\BinderWeb\Views\Users\_UserDetails.cshtml"
           Write(await Html.PartialAsync("_GroupMembership.cshtml"));

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
            </div>
            

        </div>

        <div class=""divDetails"">
            <ul>
                <li class=""accept"">
                    <button id=""btnSave"" class=""k-button"" type=""submit"">Save</button> &nbsp;&nbsp;

                    <button id=""btnClearAll"" class=""k-button"" >Clear</button>
                </li>
                <li class=""status"">
                </li>
            </ul>
        </div>
    </fieldset>
</div>
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