import React, { Component } from "react";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import Homepage from "../components/Homepage/Homepage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NickNameSet from "../components/NickNameSet";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/room/:roomid" component={NickNameSet} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
