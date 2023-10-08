using Api.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api.Controllers
{
    public class HelcimController : BaseApiController
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HelcimController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("getHelcimTokens")]
        public async Task<IActionResult> GetHelcimTokens()
        {
            Console.WriteLine("Trying to call");
            try
            {
                // Create an instance of HttpClient using the IHttpClientFactory
                var httpClient = _httpClientFactory.CreateClient();

                // Define the Helcim API URL
                var apiUrl = "https://api.helcim.com/v2/helcim-pay/initialize";

                // Set up the request headers
                httpClient.DefaultRequestHeaders.Add("accept", "application/json");
                httpClient.DefaultRequestHeaders.Add("api-token", "afDW%Xv8idT3G8w*w28A8x4ppphRA#TfPle.#6naPIuYDhS16zuj-@8O4FuVXCD4");

                // Create a JSON payload for the request body
                var requestContent = new StringContent(
                    @"{
                        ""paymentType"": ""purchase"",
                        ""amount"": 100,
                        ""currency"": ""CAD"",
                        ""paymentMethod"": ""cc"",
                        ""taxAmount"": 3.67
                    }",
                    Encoding.UTF8,
                    "application/json"
                );

                // Send the POST request to the Helcim API
                var response = await httpClient.PostAsync(apiUrl, requestContent);
                

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("############################### - - - "+responseContent);
                    return Ok(responseContent);
                }
                else
                {
                    // Handle the error case here
                    return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that may occur during the request
                Console.WriteLine($"################################ - - - Error: {ex}");
                return BadRequest(ex.Message);
            }
        }
    }
}
