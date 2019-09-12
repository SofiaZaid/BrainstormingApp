import React, { Component } from "react";
import BrainstormingRoomPage from "./BrainstormingRoom/BrainstormingRoom.js";

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
        <div>
          <input
            type="text"
            placeholder="Enter your nickname"
            ref={ref => (this.nickNameTextInput = ref)}
            id="nickNameField"
          />
          <br />
          <button type="button" onClick={this.handleClick}>
            Add
          </button>
        </div>
      );
  }
}

export default NickNameSet;
