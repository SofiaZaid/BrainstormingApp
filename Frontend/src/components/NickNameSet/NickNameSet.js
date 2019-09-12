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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.nickNameTextInput !== null) {
      this.setState({
        nickName: this.nickNameTextInput.value,
        nickNameIsSet: true
      });
    }
  }

  render() {
    if (this.state.nickNameIsSet) {
      return (
        <BrainstormingRoomPage
          roomid={this.props.match.params.roomid}
          nickname={this.state.nickname}
        ></BrainstormingRoomPage>
      );
    } else
      return (
        <div id="nickNamePromptWrapper">
          <span id="nickNameHeader">
            Hello, loooks like you are new to this brainstorming room, please
            enter a nickname and click Add.
          </span>
          <input
            type="text"
            placeholder="Enter your nickname"
            ref={ref => (this.nickNameTextInput = ref)}
            id="nickNameField"
          />
          <br />
          <button
            type="button"
            id="addNickNameButton"
            onClick={this.handleClick}
          >
            Add
          </button>
        </div>
      );
  }
}

export default NickNameSet;
