import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = null;
    this.interval = null;
  }
  state = {
    socket: null,
  }

  componentDidMount = () => {
    this.connectToBlockchain();
  }

  connectToBlockchain = () => {
    this.socket = new WebSocket('ws://localhost:8081');
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      /*this.setState( (state) => {
        return {
          blocks: [data, ...this.state.blocks],
          trxs: this.countTransactions(data) + state.trxs,
        };
      });*/
    };

    
    this.socket.onopen = () => {
      let i = 10;
      this.interval = setInterval( () => {
        this.sendTransaction('person', 'account', i++);
        if ( i === 100) { clearInterval(this.interval); }
      }, 2000);
    };

    this.socket.onerror = (event) => {
      console.log(`Error`, event);
    };

    this.socket.onclose = (event) => {
      console.log(`Connection with blockchain is closed`);
      clearInterval(this.interval);
    };
  }

  sendTransaction = (from, to, amount) => {
    this.socket.send(
      JSON.stringify({
        from,
        to,
        amount,
      })
    );
  }

  render() {
    return (
      <div className="App" />
    );
  }
}

export default App;
