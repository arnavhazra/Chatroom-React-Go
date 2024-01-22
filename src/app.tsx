import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat" component={ChatRoom} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
