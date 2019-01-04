import React, { Component } from "react";

import '../css/App.less';

class App extends Component {
  constructor() {
    super();

    this.state = {
      blocks: []
    }

    this.socket = null;
    this.connectToBlockchain();
  }

  connectToBlockchain = () => {
    this.socket = new WebSocket('ws://localhost:8081');

    this.socket.onmessage = (event) => {
      this.setState( { blocks: [ ...this.state.blocks, event.data]});
    };
  }

  render() {

    const { blocks } = this.state;

    return (
      <div className="app">
        <div className="page">
          {
            blocks.map( (el) => {
              return (
                <div className="block" key={el}>{el}</div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default App;