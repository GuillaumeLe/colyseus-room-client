import React, { Component } from 'react';
import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import 'status-indicator/styles.css';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  status: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 'unset'
  }
}
export default class ConnexionStatus extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h5>
          Connexion Status :
        </h5>
        {
          this.props.client ?
          <div style={{textAlign: 'left'}}>
            <div style={styles.status}>
              <status-indicator positive />
              <p>Connected</p>
            </div>
            <div style={styles.row}>
              <p style={styles.label} >URI:</p><pre>{this.props.client.hostname}</pre>
            </div>
            <div style={styles.row}>
              <p style={styles.label} >ID:</p> <pre>{this.props.client.id}</pre>
            </div>
          </div> :
          <div style={styles.status}>
            <status-indicator negative />
            <p>Not connected</p>
          </div>
        }
        <Button variant="fab" color="secondary" aria-label="clear" onClick={this.props.reset}>
          <DeleteIcon />
        </Button>
      </div>
    )
  }
}
