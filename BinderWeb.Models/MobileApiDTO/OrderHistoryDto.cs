﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.MobileApiDTO
{
    public class OrderHistoryDto
    {
        public int DealerId { get; set; }
        public DateTime PickupDate { get; set; }
        public int StateId { get; set; }
        public string TimeSlot { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string PickupPoint { get; set; }
        public string ProductName { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderId { get; set; }
        public string OrderNo { get; set; }
        public string StateName { get; set; }
        public string SOC { get; set; }
    }
}