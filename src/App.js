import React, { Component } from "react";
import Button from "material-ui/Button";
import AddIcon from "@material-ui/icons/Add";

import Client from "./components/Client";
import { ID } from "./services/utils";

import "./App.css";

const styles = {
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [
        {
          name: "Client 1",
          id: ID()
        }
      ]
    };

    this.addClient = this.addClient.bind(this);
  }

  addClient() {
    this.setState({
      clients: [...this.state.clients, { name: "New client", id: ID() }]
    });
  }
  removeClient = id => () => {
    this.setState({
      clients: this.state.clients.filter((client, i) => client.id !== id)
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Colyseus Room Client</h1>
        </header>
        {this.state.clients.map((client, index) => (
          <Client
            client={client}
            key={client.id}
            onRemove={this.removeClient}
          />
        ))}
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          style={styles.addButton}
          onClick={this.addClient}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default App;
