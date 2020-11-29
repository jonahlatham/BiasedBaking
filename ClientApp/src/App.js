import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Vote from './components/Vote/Vote';
import Results from './components/Results/Results';
import Admin from './components/Admin/Admin';

let authRoutes = '';
authRoutes = [
  <Route key={1} path="/vote" component={Vote} />,
  <Route key={2} path="/results" component={Results} />,
  <Route key={3} path="/admin" component={Admin} />
];

class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {authRoutes}
            <Route path="/login" component={Login} />
            <Route path="/" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
