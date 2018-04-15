import React, { Component } from 'react';
import { Client } from 'colyseus.js';
import ReactJson from 'react-json-view';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import ConnexionStatus from './ConnexionStatus';
import ErrorBox from './ErrorBox'

import '../App.css';

const styles = {
  textField: {
    marginLeft: 5,
    marginRight: 5,
    width: 200,
  },
  button: {
    height: 50,
  },
  form: {
    flex: 3,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      roomName: '',
      jsonOption: {},
      message: {},
      roomState: {},
      client: null,
      room: null,
      receivedMessage: {},
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateRoomState = this.updateRoomState.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.updateReceivedMessage = this.updateReceivedMessage.bind(this);
    this.onClientError = this.onClientError.bind(this);
    this.resetConnection = this.resetConnection.bind(this);

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateRoomState(state) {
    this.setState({ roomState: state });
  }

  updateReceivedMessage(message) {
    this.setState({ receivedMessage: message });
  }

  submitMessage(event) {
        event.preventDefault();
        event.stopPropagation();

        try {
          this.state.room.send(this.state.message);
        } catch (error) {
          console.log('Fail to send message:', error);
        }
  }

  onClientClose() {
    console.log("connection has been closed");
  }

  onClientError(err) {
    console.log("Client error :", err);
    this.state.client.close();
    this.setState({ error: 'Client error :'+err,  client: null, room: null });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      this.setState({client: new Client(this.state.uri), error: null }, () => {
        this.setState({room: this.state.client.join(this.state.roomName, this.state.jsonOption)}, () => {
          this.state.room.onStateChange.add(this.updateRoomState);
          this.state.room.onMessage.add(this.updateReceivedMessage);
          this.state.client.onClose.add(this.onClientClose);
          this.state.client.onError.add(this.onClientError);
        });
      });
    } catch (err) {
      console.log('Fail to connect', err);
    }
  }

  updateJsonInput = field => update => {
    this.setState({[field]: update.updated_src})
  }

  resetConnection() {
    this.state.client.close();
    this.setState({
      client: null,
      room: null,
      roomState: {},
    })
  }

  render() {
    return (
      <div className="App-intro">
        { this.state.error && <ErrorBox message={this.state.error} /> }
        <h3>Server connexion</h3>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <form style={styles.form}>
            <TextField
              id="uri"
              label="Server URI"
              value={this.state.uri}
              onChange={this.handleChange('uri')}
              margin="normal"
              style={styles.textField}
            />
            <TextField
              id="room"
              label="Room name:"
              value={this.state.roomName}
              onChange={this.handleChange('roomName')}
              margin="normal"
              style={styles.textField}
            />
            <ReactJson src={this.state.jsonOption}
              name={'option'}
              onEdit={this.updateJsonInput('jsonOption')}
              onDelete={this.updateJsonInput('jsonOption')}
              onAdd={this.updateJsonInput('jsonOption')}
              style={{textAlign: 'left', width: 300, minHeight: 100,overflow:'hidden'}}
            />
            <Button variant="raised" color="primary" style={styles.button} onClick={this.handleSubmit}>
              Connect to room
            </Button>
          </form>
          <ConnexionStatus
            client={this.state.client}
            reset={this.resetConnection}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 50, width: '60%'}}>
          <div>
            <h3>Room state:</h3>
            <ReactJson
              name={false}
              src={this.state.roomState}
              theme="solarized"
              style={{textAlign: 'left', width: 400, minHeight: 100}}
            />
          </div>
          <form>
            <ReactJson src={this.state.message}
              name={'message'}
              onEdit={this.updateJsonInput('message')}
              onDelete={this.updateJsonInput('message')}
              onAdd={this.updateJsonInput('message')}
              style={{textAlign: 'left', width: 300, minHeight: 100}}
            />
            <Button variant="raised" color="primary" style={styles.button} onClick={this.submitMessage}>
              Send message
            </Button>
            <h4>Received Message</h4>
            <ReactJson src={this.state.receivedMessage}
              name={'receivedMessage'}
              style={{textAlign: 'left', width: 300, minHeight: 100}}
              theme="solarized"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
