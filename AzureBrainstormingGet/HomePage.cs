using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AzureMindMapGet
{
    public static class HomePage
    {
        [FunctionName("HomePage")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            [Blob("website/testBrainstormingHome", FileAccess.Read)] Stream testBrainstormingHome,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            HttpResponseMessage response = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            using(StreamReader reader = new StreamReader(testBrainstormingHome))
            {
                response.Content = new StringContent(await reader.ReadToEndAsync());
            }
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            return response;
        }
    }
}
