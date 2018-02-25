import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header/Header';
import {Grid} from 'react-bootstrap';
import ProfilePage from "./components/Body/Profile/ProfilePage";
import HomePage from './components/Body/HomePage';
import LoginPage from './components/Body/Login/LoginPage';
import LogoutPage from './components/Body/Login/LogoutPage';

class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <main role="main">
              <Grid bsClass="container">
                  <Route path="/" exact={true} component={HomePage} />
                  <Route path="/login" render={() => <LoginPage />} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/logout" component={LogoutPage} />
              </Grid>
          </main>
      </div>
    );
  }
}

export default App;
