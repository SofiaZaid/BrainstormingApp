import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Homepage from '../components/Homepage/Homepage';
import BrainstormingRoom from '../components/BrainstormingRoom/BrainstormingRoom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path = "/room/:roomid" component={BrainstormingRoom}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;