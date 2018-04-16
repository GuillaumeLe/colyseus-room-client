/* @flow */

import React, { Component } from "react";

export default class ErrorBox extends Component {
  render() {
    return (
      <div style={styles.container}>
        <p style={styles.message}>{this.props.message}</p>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#ff0033",
    width: "70%",
    margin: "10px",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px"
  },
  message: {
    color: "white"
  }
};
