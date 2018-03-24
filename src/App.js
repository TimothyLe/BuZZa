import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Squares from './components/Squares';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Squares />
      </div>
    );
  }
}

export default App;
