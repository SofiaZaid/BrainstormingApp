import React from "react";
import "./Homepage.css";
import { baseURL as URL } from "../../Settings/Constants";

function getNewRoom() {
  fetch("http://localhost:7071/api/NewRoomGet")
    .then(roomResponse => roomResponse.json())
    .then(roomId => {
      window.location.href = URL + "room/" + roomId;
    });
}

const homepage = props => {
  return (
    <div className="wrapper">
      <span id="headlineHomepage">Welcome to the brainstorming app</span>
      <button id="newRoomButton" onClick={getNewRoom}>
        Click for new brainstorming room
      </button>
    </div>
  );
};
export default homepage;
