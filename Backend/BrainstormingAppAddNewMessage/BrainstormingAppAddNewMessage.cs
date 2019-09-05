using BrainstormingApp.Data;
using BrainstormingApp.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

[assembly: FunctionsStartup(typeof(Startup.Startup))]
namespace BrainstormingAppAddNewMessage
{

    public class BrainstormingAppAddNewMessage
    {
        private readonly BrainstormingAppContext _context;

        public BrainstormingAppAddNewMessage(BrainstormingAppContext context)
        {
            _context = context;
        }

        [FunctionName("BrainstormingAppAddNewMessage")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "rooms/{id}")] HttpRequest req, string id,
            ILogger log)
        {
            var guid = new Guid(id);
            var room = _context.Rooms
                .Where(r => r.Id.Equals(guid))
                .Include(r => r.Messages)
                .Single();

            string json = await req.ReadAsStringAsync();
            var body = JsonConvert.DeserializeObject<Message>(json);
            var message = new Message
            {
                Id = Guid.NewGuid(),
                MessageText = body.MessageText,
                UserNick = body.UserNick
            };

            room.Messages.Add(message);
            await _context.SaveChangesAsync();

            return new OkObjectResult(message.Id);
        }
    }
}
