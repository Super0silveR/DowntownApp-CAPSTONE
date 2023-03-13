using FluentValidation.Results;

namespace Application.Common.Exceptions
{
    /// <summary>
    /// Custom Application Exception Class.
    /// </summary>
    public class ApplicationException
    {
        public ApplicationException(int statusCode, string? message, string? details = null, IDictionary<string, string[]>? errors = null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
            Errors = errors;
        }

        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public string? Details { get; set; }

        public IDictionary<string, string[]>? Errors { get; set; }
    }
}
