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
      <h1 id="headlineHomepage">The brainstorming app</h1>
      <button id="newRoomButton" onClick={getNewRoom}>
        Click for new brainstorming room
      </button>
      <span id="introText">
        Welcome to the brainstorming app. Here you can easily create a room
        where you can let all your ideas on a topic/project, etc. flow. Works
        both for solo projects and teamwork.
      </span>
    </div>
  );
};
export default homepage;
