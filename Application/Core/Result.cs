namespace Application.Core
{
    /// <summary>
    /// Result used as the return value of our controllers' IActionResult.
    /// </summary>
    /// <typeparam name="T">Type of domain entity returned.</typeparam>
    public class Result<T>
    {
        public string? Error { get; set; }
        public bool IsSuccess { get; set; }
        public T? Value { get; set; }

        public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };

        public static Result<T> Failure(string error) => new() { IsSuccess = false, Error = error };
    }
}
