namespace Api.DTOs.Helcim
{
    public class HelcimResponseDto
    {
        //The secretToken is used for validation purposes after a transaction has been processed successfully.
        //This token, along with transaction data in the response are used to create a hash.
        //You can use this to verify that the data in the transaction response is valid and has not been tampered with.
        public string? secretToken { get; set; }

        //The checkoutToken is the key to displaying the HelcimPay.js modal using the appendHelcimIframe function.
        //This token ensures a secure connection between the cardholder’s web browser and the Helcim Payment API endpoint.
        //Please note, the checkout token is a unique value for each payment instance,
        //and it expires after 60 minutes, or once the transaction is processed.
        //Having unique and recent checkout tokens reduces the likelihood that an unauthorized payment is processed.
        public string? checkoutToken { get; set; }
    }
}
