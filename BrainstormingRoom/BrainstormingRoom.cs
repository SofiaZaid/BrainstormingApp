using System;
using System.Collections.Generic;

namespace BrainstormingApp.Domain
{
    public class BrainstormingRoom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
