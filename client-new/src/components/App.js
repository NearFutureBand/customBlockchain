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
      /*this.socket.send(
        JSON.stringify({
          type: 'createAccount',
          nickname: 'paulWhite43',
          publicKey: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
          from: 'virtualchain',
          privateKey: 'd5db7c72e97476e3d9d2fb4a77ddbd86a68d25f61cfaf32525f4c23f3c1c4e16',
          memo: 'hello world',
        })
      );*/

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
