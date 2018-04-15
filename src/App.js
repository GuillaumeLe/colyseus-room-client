import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

import Client from './components/Client';

import './App.css';

const styles = {
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: ['Client 1'],
    };

    this.addClient = this.addClient.bind(this);
  }

  addClient() {
    this.setState({clients: [ ...this.state.clients, 'New client']});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Colyseus Room Client</h1>
        </header>
        {this.state.clients.map((client, index) => <Client name={client} key={index} />)}
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          style={styles.addButton}
          onClick={this.addClient}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default App;
