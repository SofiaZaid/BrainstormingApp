import React, { Component } from "react";
import "./BrainstormingRoom.css";
import { updateMessageListMilliSeconds as milliSeconds } from "../../Settings/Constants";

class BrainstormingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], messageIds: [] };

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
            <li key={item.id.toString()}>
              {" "}
              {this.addRemoveButton(item.id.toString())} {item.messageText}
            </li>
          ))}
        </ul>
        <textarea
          id="writeIdeaArea"
          placeholder="Write your idea here"
          ref="writeIdeaArea"
          onKeyUp={this.keyPress}
        ></textarea>
        <button
          className="buttonBeforeHover"
          id="addMessageButton"
          onClick={this.addListItem.bind(this)}
        >
          Add note
        </button>
      </div>
    );
  }

  isMyMessage(messageId) {
    return this.state.messageIds.includes(messageId);
  }

  renderRemoveButton() {
    return <button>Remove</button>;
  }

  addRemoveButton(messageId) {
    console.log("nu är jag i addremovebutton");
    if (this.isMyMessage(messageId)) {
      console.log("jag ska skriva en knapp");
      return this.renderRemoveButton();
    }
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
    })
      .then(messageId => messageId.json())
      .then(messageId =>
        this.setState({ messageIds: this.state.messageIds.concat(messageId) })
      );
    alert(this.state.messageIds);
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
