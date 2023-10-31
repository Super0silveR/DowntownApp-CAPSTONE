using Api.Controllers.Base;
using Api.DTOs.Helcim;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api.Controllers
{
    [AllowAnonymous]
    public class HelcimController : BaseApiController
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpClientFactory"></param>
        public HelcimController(IConfiguration configuration ,IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetHelcimTokens(HelcimPayDto payDto)
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
                httpClient.DefaultRequestHeaders.Add("api-token", _configuration["Helcim:SecretToken"]);

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
                    Console.WriteLine("############################### - - - " + responseContent);
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
                return Unauthorized();
            }
        }
    }
}