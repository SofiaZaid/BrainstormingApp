using BrainstormingApp.Data;
using BrainstormingApp.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

[assembly: FunctionsStartup(typeof(Startup.Startup))]
namespace Startup
{
    public class GetNewRoom
    {
        private readonly BrainstormingAppContext _context;

        public GetNewRoom(BrainstormingAppContext context)
        {
            _context = context;
        }

        [FunctionName("NewRoomGet")]
        public async Task<IActionResult> Get(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string name = req.Query["name"];

            var room = new BrainstormingRoom { Id = Guid.NewGuid(), Name = name };

            await _context.AddAsync(room);
            await _context.SaveChangesAsync();
            return new OkObjectResult(room.Id);
        }
    }
}
