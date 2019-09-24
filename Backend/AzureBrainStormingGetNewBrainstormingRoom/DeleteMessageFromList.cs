using BrainstormingApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;


[assembly: FunctionsStartup(typeof(Startup.Startup))]
namespace AzureBrainStormingGetNewBrainstormingRoom
{
    public class DeleteMessageFromList
    {
        private readonly BrainstormingAppContext _context;

        public DeleteMessageFromList(BrainstormingAppContext context)
        {
            _context = context;
        }

        [FunctionName("DeleteMessageFromList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "delete",Route = "rooms/{id}")] HttpRequest req,
            string msgId,
            ILogger log)
        {
            var guid = new Guid(msgId);

            var message = _context.Messages.Where(m => m.Id.ToString() == msgId).SingleOrDefault();
            if(null == message)
            {
                return new NotFoundResult();
            }

            message.MessageArchived = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new OkResult();
        }
    }
}
