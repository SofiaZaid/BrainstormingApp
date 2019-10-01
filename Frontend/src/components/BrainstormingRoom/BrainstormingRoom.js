import React, { Component } from "react";
import "../Button/Button.css";
import "./BrainstormingRoom.css";
import {
  updateMessageListMilliSeconds as milliSeconds,
  apiBaseURL
} from "../../Settings/Constants";

class BrainstormingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], messageIds: [] };

    this.keyPress = this.keyPress.bind(this);
    this.onlyNewMessages = this.onlyNewMessages.bind(this);
  }

  componentDidMount() {
    this.getNewMessagesToUpdateList(new Date("1900-01-01 00:00:00"));
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.addListItem(this.refs.writeIdeaArea.value);
    }
  }

  render() {
    return (
      <div id="wrap">
        <span id="headlineRoom">Your room</span>
        <ul id="addedIdeasList">
          {this.state.items.map(item => (
            <li id="brainstormingItem" key={item.id}>
              {item.messageText} {this.addRemoveButton(item.id)}
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

  messageWasSentByMe(messageId) {
    return this.state.messageIds.includes(messageId);
  }

  renderRemoveButton(messageId) {
    return (
      <button
        onClick={() => this.removeListItem(messageId)}
        id="removeItemButton"
      >
        Remove
      </button>
    );
  }

  addRemoveButton(messageId) {
    if (this.messageWasSentByMe(messageId)) {
      return this.renderRemoveButton(messageId);
    }
  }

  removeListItem = itemId => {
    const items = this.state.items.filter(item => item.id !== itemId);
    this.setState({ items: items });
    fetch(apiBaseURL + "/api/rooms/" + itemId, {
      method: "DELETE"
    });
  };

  addListItem() {
    let ideaArea = document.getElementById("writeIdeaArea");
    let idea = ideaArea.value;
    fetch(apiBaseURL + "/api/rooms/" + this.props.roomid, {
      method: "POST",
      body: JSON.stringify({
        MessageText: idea,
        UserNick: this.props.nickname
      })
    })
      .then(messageId => messageId.json())
      .then(messageId => {
        this.setState({ messageIds: this.state.messageIds.concat(messageId) });
      });
    ideaArea.focus();
    ideaArea.value = "";
  }

  onlyNewMessages(incomingMessages) {
    const oldIds = this.state.items.map(m => m.id);
    return incomingMessages.filter(m => !oldIds.includes(m.id));
  }

  getNewMessagesToUpdateList(timeOfLastUpdate) {
    let date = this.formatTime(timeOfLastUpdate);
    let thisUpdate = new Date();
    fetch(apiBaseURL + "/api/newmessages/" + this.props.roomid + "/" + date)
      .then(messages => messages.json())
      .then(messages => {
        this.setState({
          items: this.state.items
            .concat(this.onlyNewMessages(messages.addedMessages))
            .filter(m => !messages.archivedMessages.includes(m.id))
        });
      })
      .then(() =>
        window.setTimeout(
          () => this.getNewMessagesToUpdateList(thisUpdate),
          milliSeconds
        )
      );
  }

  formatTime(dateToFormat) {
    let date =
      dateToFormat.getUTCFullYear() +
      "-" +
      (dateToFormat.getUTCMonth() + 1) +
      "-" +
      dateToFormat.getUTCDate();
    let time =
      dateToFormat.getUTCHours() +
      ":" +
      dateToFormat.getUTCMinutes() +
      ":" +
      dateToFormat.getUTCSeconds();
    return date + " " + time;
  }
}

export default BrainstormingRoom;
