using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Model
{
    public class SchedulerEvent
    {
        //public int OutletVisitingScheduleId { get; set; }
        public int HrRecordId { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime VisitingDate { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string StartTimezone { get; set; }
        public string EndTimezone { get; set; }
        public int RecurrenceId { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }
        //public int Outlet { get; set; }
        public string LocationName { get; set; }
        public string Address { get; set; }
        public string GeoLocation { get; set; }
        public int CreateBy { get; set; }
        public int UpdateBy { get; set; }
 

 

    }
}