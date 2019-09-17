using BrainstormingApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

[assembly: FunctionsStartup(typeof(Startup.Startup))]
namespace AzureBrainStormingGetNewBrainstormingRoom
{
    public class GetUpdateMessageList
    {
        private readonly BrainstormingAppContext _context;

        public GetUpdateMessageList(BrainstormingAppContext context)
        {
            _context = context;
        }

        [FunctionName("GetUpdateMessageList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "newmessages/{id}/{startTime}")] HttpRequest req, string startTime,
            string id,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var guid = new Guid(id);
            var room = await _context.Rooms.SingleOrDefaultAsync(m => m.Id == guid);
            if (null == room)
            {
                return new NotFoundObjectResult("Room id not found.");
            }

            var messages = await _context.Rooms
                .Where(r => r.Id.Equals(guid))
                .SelectMany(r => r.Messages.Where(msg => msg.MessageCreated >= DateTime.Parse(startTime)))
                .ToListAsync();

            return new OkObjectResult(messages);
        }
    }
}
