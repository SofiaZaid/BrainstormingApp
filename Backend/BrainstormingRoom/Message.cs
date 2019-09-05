using System;

namespace BrainstormingApp.Domain
{
    public class Message
    {
        public Guid Id { get; set; }

        public string UserNick { get; set; }

        public string MessageText { get; set; }

        public DateTime MessageCreated { get; set; }
    }
}
