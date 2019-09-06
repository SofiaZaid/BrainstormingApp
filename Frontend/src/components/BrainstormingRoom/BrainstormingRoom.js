import React, { Component } from 'react';
import './BrainstormingRoom.css';

class BrainstormingRoom extends Component {
  render() {
    return (
      <div id="wrap">
        <span id="headlineRoom">Your room</span>
            <ul id="addedIdeasList">
            </ul>
            <input type="text" id="writeIdeaArea" placeholder="Write your idea here"></input>
        <button id= "addMessageButton" onClick= {this.addListItem.bind(this)}>Click to add your note to the brainstorming list</button>
      </div>
    );
  };

  addListItem () {
    let ideaArea = document.getElementById('writeIdeaArea');
    let idea = ideaArea.value;
    fetch("http://localhost:7071/api/rooms/" + this.props.match.params.roomid,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          MessageText: idea,
          UserNick: 'anonymous'
        }
      )
    }); 
    ideaArea.focus();
    ideaArea.value = "";
  }


};

export default BrainstormingRoom;