import React, { Component } from "react";
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import Block from '../components/Block';

import ExplorerStats from './ExplorerStats';
import '../css/Explorer.less';

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
        const trx = { 
          from: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
          to: '04b87b0b0b3fd09106b5e3af3c1e176c8b47dfb1b4f540f1d8c6df85507ec35c98e20c008ac2621132f042158535c4ffac5778a14bbe4134c19581932d6208eee8',
          amount: i++,
          privateKey: '1eefe1060cee7c88a5f19253b11075d1d42e1fea5c8c6b65ceda1a290fdc6e16'
        };
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
        <ExplorerStats
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