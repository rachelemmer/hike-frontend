import React, {Component} from "react";
import "./App.css";
import Signup from "./Signup"
import Home from "./Home"
import Nav from "./Nav"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


export default class App extends Component {

  state = {
    isLoggedIn: false
  }

  setIsLoggedIn = (value) => {
    this.setState({isLoggedIn: value})
  }

  
  render(){
    return (
      <div className="App">
        <Router>
          <Nav />
          <Switch>
            <Route
            exact path='/'
            render={(props) => 
              <Home/>
            }
            />
            <Route 
              path='/signup'
              render={(props) =>
                <Signup/>
              }
            />
            <Route 
              path='/login'
              render={(props) =>
                <Login setIsLoggedIn={this.setIsLoggedIn} {...props}/>
              }
            />
            <Route 
              path='/dashboard'
              render={(props) =>
                <Dashboard/>
              }
            />
          </Switch>
        </Router> 
      </div>
    );
  }
}

