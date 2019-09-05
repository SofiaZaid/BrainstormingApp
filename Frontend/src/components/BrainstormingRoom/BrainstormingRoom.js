import React from "react";
import './BrainstormingRoom.css';

const brainstormingRoom = props => {
    return (
      <div id="wrap">
        <span id="headlineRoom">Your room</span>
          <button id= "addMessageButton">Click to add your note to the brainstorming list</button>
          {/* <div>{props.match.params.roomid}</div> */}
          </div>
    );
  };
  export default brainstormingRoom;
  