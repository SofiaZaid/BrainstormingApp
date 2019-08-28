using BrainstormingApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace GetUpdatedMessageListInRoom
{
    public class GetUpdatedMessageListInRoom
    {
        private readonly BrainstormingAppContext _context;

        public GetUpdatedMessageListInRoom(BrainstormingAppContext context)
        {
            _context = context;
        }

        [FunctionName("GetUpdatedMessageListInRoom")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, DateTime startTime,
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
                .SelectMany(r => r.Messages.Where(msg => msg.MessageCreated >= startTime))
                .ToListAsync();

            return new OkObjectResult(messages);
        }
    }
}
