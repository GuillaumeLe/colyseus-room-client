import React, { Component } from 'react';

import Client from './components/Client';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Colyseus Room Client</h1>
        </header>
        <Client />
      </div>
    );
  }
}

export default App;
