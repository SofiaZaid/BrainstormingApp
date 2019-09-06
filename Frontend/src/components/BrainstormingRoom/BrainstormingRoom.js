import React, { Component } from 'react';
import './BrainstormingRoom.css';

class BrainstormingRoom extends Component {
  render() {
    return (
      <div id="wrap">
        <span id="headlineRoom">Your room</span>
            <ul id="addedIdeasList">
            </ul>
            <textarea id="writeIdeaArea" placeholder="Write your idea here"></textarea>
        <button id= "addMessageButton">Click to add your note to the brainstorming list</button>
        {/* <div>{props.match.params.roomid}</div> */}
      </div>
    );
  };

  addListItem () {
    
  }
};

export default BrainstormingRoom;