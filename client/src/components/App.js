import React, { Component } from "react";
import { Grid } from 'semantic-ui-react';
import Block from '../components/Block';

import '../css/App.less';


class App extends Component {
  constructor() {
    super();

    this.state = {
      blocks: []
    }
    this.interval = null;
    this.socket = null;
  }

  componentDidMount = () => {
    this.connectToBlockchain();
  }

  connectToBlockchain = () => {
    this.socket = new WebSocket('ws://localhost:8081');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      this.setState( { blocks: [ ...this.state.blocks, data]});
    };

    
    this.socket.onopen = () => {

      let i = 10;
      this.interval = setInterval( () => {
        const trx = { from: 'paulwhite43', to: 'blanketty46', amount: i++};
        console.log(trx);
        this.socket.send( JSON.stringify( trx ) );
        if( i === 100) clearInterval( this.interval);
      }, 1000);
    
    };
  }

  render() {

    const { blocks } = this.state;

    return (
      <div className="app">
        <Grid>
          {
            blocks.map( (el) => {
              return (
                <Grid.Row key={el.hash}>
                  <Block data={el} />
                </Grid.Row>  
              )
            })
          }
        </Grid>
      </div>
    );
  }
}
export default App;