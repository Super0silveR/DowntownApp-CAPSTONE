#nullable disable
namespace Domain.Entities
{
    internal class HelcimPayResponse
    {
        public string SecretToken { get; set; }
        public string CheckoutToken { get; set; }
    }
}
