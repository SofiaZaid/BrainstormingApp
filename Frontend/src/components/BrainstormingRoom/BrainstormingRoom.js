import React, { Component } from "react";
import "./BrainstormingRoom.css";
import { updateMessageListMilliSeconds as milliSeconds } from "../../Settings/Constants";

class BrainstormingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };

    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    this.getUpdateList(new Date("1900-01-01 00:00:00"));
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      console.log("value", e.target.value);
      this.addListItem(this.refs.writeIdeaArea.value);
    }
  }

  render() {
    return (
      <div id="wrap">
        <span id="headlineRoom">Your room</span>
        <ul id="addedIdeasList">
          {this.state.items.map(item => (
            <li key={item.id.toString()}>{item.messageText}</li>
          ))}
        </ul>
        <input
          type="text"
          id="writeIdeaArea"
          placeholder="Write your idea here"
          ref="writeIdeaArea"
          onKeyUp={this.keyPress}
        ></input>
        <button id="addMessageButton" onClick={this.addListItem.bind(this)}>
          Click to add your note to the brainstorming list
        </button>
      </div>
    );
  }

  addListItem() {
    let ideaArea = document.getElementById("writeIdeaArea");
    let idea = ideaArea.value;
    fetch("http://localhost:7071/api/rooms/" + this.props.roomid, {
      method: "POST",
      body: JSON.stringify({
        MessageText: idea,
        UserNick: this.props.nickname
      })
    });
    alert(this.props.nickname);
    ideaArea.focus();
    ideaArea.value = "";
  }

  getUpdateList(timeOfLastUpdate) {
    let date = this.formatTime(timeOfLastUpdate);
    let thisUpdate = new Date();
    fetch(
      "http://localhost:7071/api/newmessages/" + this.props.roomid + "/" + date
    )
      .then(messages => messages.json())
      .then(messages =>
        this.setState({ items: this.state.items.concat(messages) })
      )
      .then(() =>
        window.setTimeout(() => this.getUpdateList(thisUpdate), milliSeconds)
      );
  }

  formatTime(dateToFormat) {
    let date =
      dateToFormat.getFullYear() +
      "-" +
      (dateToFormat.getMonth() + 1) +
      "-" +
      dateToFormat.getDate();
    let time =
      dateToFormat.getHours() +
      ":" +
      dateToFormat.getMinutes() +
      ":" +
      dateToFormat.getSeconds();
    return date + " " + time;
  }
}

export default BrainstormingRoom;
