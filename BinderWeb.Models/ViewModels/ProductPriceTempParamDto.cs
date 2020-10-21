using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.ViewModels
{
    public class ProductPriceTempParamDto
    {

        public List<ProductPriceTempVm> productPriceTempVms { get; set; }
        public ProductPriceParam param { get; set; }
    }
}
