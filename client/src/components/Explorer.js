import React, { Component } from "react";
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import Block from '../components/Block';

import Header from '../components/Header';

export default class Explorer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      blocks: [],
      trxs: 0
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
      //console.log(data);

      this.setState( (state) => {
        return {
          blocks: [ data, ...this.state.blocks ],
          trxs: this.countTransactions(data) + state.trxs
        }
      })
    };

    
    this.socket.onopen = () => {

      let i = 10;
      this.interval = setInterval( () => {
        const trx = { from: 'paulwhite43', to: 'blanketty46', amount: i++};
        //console.log(trx);
        this.socket.send( JSON.stringify( trx ) );
        if( i === 100) clearInterval( this.interval );
      }, 1000);
    
    };

    this.socket.onerror = (event) => {
      console.log(`Error`, event);
    }

    this.socket.onclose = (event ) => {
      console.log(`Connection with blockchain is closed`);
      clearInterval(this.interval);
    }
  }

  countTransactions = (newBlock) => {
    return _.keys(newBlock.transactions).length;
  }

  render() {
    const { blocks, trxs } = this.state;

    return (
      <div className="explorer">
        <Header
            data={{ 
              blocks: blocks.length,
              trxs
            }} 
          />
        <Grid>
          {
            blocks.map( (el) => {
              return (
                <Grid.Row key={el.hash}>
                  <Grid.Column>
                    <Block data={el} />
                  </Grid.Column>
                </Grid.Row>  
              )
            })
          }
        </Grid>
      </div>
    );
  }

}