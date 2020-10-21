using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace Utilities
{
    public static class ListExtension 
    {
        public static GridEntity<T> ToGridDataSource<T>(this List<T> list)
        {
            return new GridEntity<T>
            {
                Items = list,
                TotalCount = list.Count
            };
        }
        public static GridEntity<T> ToGridDataSource<T>(this List<T> list, GridOptions options)
        {
            var pageList = list.Take(options.take).Skip(options.skip).ToList();

            return new GridEntity<T>
            {
                Items = pageList,
                TotalCount = list.Count
            };
        }
    }
}
