using Microsoft.AspNetCore.Components.Forms;

namespace TennisMvcClient.Components
{
    public class CustomInputSelect<TValue> : InputSelect<TValue>
    {
        protected override bool TryParseValueFromString(string value, out TValue result,
            out string validationErrorMessage)
        {
            if (typeof(TValue) == typeof(int) || typeof(TValue) == typeof(int?)) {
                if (typeof(TValue) == typeof(int?) && string.IsNullOrWhiteSpace(value)) {
                    result = (TValue)(object) null;
                    validationErrorMessage = null;
                    return true;
                }
                else
                if (int.TryParse(value, out var resultInt)) {
                    result = (TValue)(object)resultInt;
                    validationErrorMessage = null;
                    return true;
                }
                else {
                    result = default;
                    validationErrorMessage =
                        $"The selected value {value} is not a valid number.";
                    return false;
                }
            } 
            
            else
            if (typeof(TValue) == typeof(long) || typeof(TValue) == typeof(long?)) {
                if (typeof(TValue) == typeof(long?) && string.IsNullOrWhiteSpace(value)) {
                    result = (TValue)(object) null; ;
                    validationErrorMessage = null;
                    return true;
                } else 
                if (long.TryParse(value, out var resultLong)) {
                    result = (TValue)(object) resultLong;
                    validationErrorMessage = null;
                    return true;
                }
                else {
                    result = default;
                    validationErrorMessage =
                        $"The selected value {value} is not a valid number.";
                    return false;
                }
            }

            else {
                return base.TryParseValueFromString(value, out result,
                    out validationErrorMessage);
            }
        }
    }
}
