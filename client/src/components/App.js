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
      console.log(JSON.parse(event.data));
      this.setState( { blocks: [ ...this.state.blocks, event.data]});
    };

    this.socket.onopen = () => {

      let i = 10;
      let interval = setTimeout( () => {
        const trx = { from: 'paulwhite43', to: 'blanketty46', amount: i++};
        console.log(trx);
        this.socket.send( JSON.stringify( trx ) );
        clearInterval( interval );
      }, 1000);
    
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