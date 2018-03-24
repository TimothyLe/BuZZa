import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Squares from './components/Squares';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">School Information App</h1>
        </header>
        <p className="App-intro">
          Keeping our students safe.
        </p>
        <Squares />
      </div>
    );
  }
}

export default App;
