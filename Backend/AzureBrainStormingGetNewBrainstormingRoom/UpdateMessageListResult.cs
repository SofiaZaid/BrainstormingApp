using BrainstormingApp.Domain;
using System;
using System.Collections.Generic;

namespace AzureBrainStormingGetNewBrainstormingRoom
{
    public class UpdateMessageListResult
    {
        public IList<Message> AddedMessages { get; set; }
        public IList<Guid> ArchivedMessages { get; set; }
    }
}
