using BrainstormingApp.Domain;
using System.Collections.Generic;

namespace AzureBrainStormingGetNewBrainstormingRoom
{
    public class UpdateMessageListResult
    {
        public IList<Message> AddedMessages { get; set; }
        public IList<Message> ArchivedMessages { get; set; }
    }
}
