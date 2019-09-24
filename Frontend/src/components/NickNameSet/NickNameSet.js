import React, { Component } from "react";
import BrainstormingRoomPage from "../BrainstormingRoom/BrainstormingRoom.js";
import "./NickNameSet.css";

class NickNameSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: "",
      nicknameIsSet: false
    };
    this.setNickName = this.setNickName.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  setNickName(inputNick) {
    this.setState({
      nickName: inputNick,
      nickNameIsSet: true
    });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      console.log("value", e.target.value);
      this.setNickName(this.refs.nickNameField.value);
    }
  }

  render() {
    if (this.state.nickNameIsSet) {
      return (
        <BrainstormingRoomPage
          roomid={this.props.match.params.roomid}
          nickname={this.state.nickName}
        ></BrainstormingRoomPage>
      );
    } else
      return (
        <div id="nickNamePromptWrapper">
          <span id="nickNameHeader">
            Hello, looks like you are new to this brainstorming room, please
            enter a nickname and click Add.
          </span>
          <input
            type="text"
            placeholder="Enter your nickname"
            id="nickNameField"
            ref="nickNameField"
            onKeyUp={this.keyPress}
          />
          <br />
          <button
            className="buttonBeforeHover"
            type="button"
            id="addNickNameButton"
            onClick={() => this.setNickName(this.refs.nickNameField.value)}
          >
            Add
          </button>
        </div>
      );
  }
}

export default NickNameSet;
