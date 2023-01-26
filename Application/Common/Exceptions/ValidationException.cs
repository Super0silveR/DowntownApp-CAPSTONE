using FluentValidation.Results;

namespace Application.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public IDictionary<string, string[]> Errors { get; set; }

        public ValidationException()
            : base()
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(string message) 
            : base(message)
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(string message, Exception innerException)
            : base(message, innerException)
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IEnumerable<ValidationFailure> failures)
            : this()
        {
            var groups = failures
                .GroupBy(f => f.PropertyName, f => f.ErrorMessage);

            foreach (var group in groups)
            {
                var propName = group.Key;
                var propFailures = group.ToArray();

                Errors.Add(propName, propFailures);
            }
        }
    }
}
