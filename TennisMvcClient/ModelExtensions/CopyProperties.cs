using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;

namespace TennisMvcClient.ModelExtensions
{
    public static class CopyProperties
    {

        /// <summary>
        /// Maps the source object to target object.
        /// </summary>
        /// <typeparam name="T">Type of target object.</typeparam>
        /// <typeparam name="TU">Type of source object.</typeparam>
        /// <param name="target">Target object.</param>
        /// <param name="source">Source object.</param>
        /// <returns>Updated target object.</returns>
        public static T Map<T, TU>(this T target, TU source)
        {
            // get property list of the target object.
            // this is a reflection extension which simply gets properties (CanWrite = true).
            var tprops = target.GetType().GetProperties();

            tprops.Where(x => x.CanWrite == true).ToList().ForEach(prop =>
            {
                // check whether source object has the the property
                var sp = source.GetType().GetProperty(prop.Name);
                if (sp != null) {
                    // if yes, copy the value to the matching property
                    var value = sp.GetValue(source, null);
                    target.GetType().GetProperty(prop.Name).SetValue(target, value, null);
                }
            });

            return target;
        }
    }
}
