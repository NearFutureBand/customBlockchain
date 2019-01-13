import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import '../css/ExplorerGraph.less';

export default class ExplorerGraph extends Component {
  constructor() {
    super();

    this.circleSizeRate = 30;
    

    this.state = {
      blocks: []
    }
  }

  componentDidMount = () => {
    this.connectToBlockchain();
  }

  connectToBlockchain = () => {
    this.socket = new WebSocket('ws://localhost:8081');
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      this.setState({
        blocks: [ ...this.state.blocks, data ]
      })
    };

    this.socket.onopen = () => {
      /*this.socket.send(
        JSON.stringify({
          type: 'createAccount',
          nickname: 'paulWhite43',
          publicKey: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
          from: 'virtualchain',
          privateKey: 'd5db7c72e97476e3d9d2fb4a77ddbd86a68d25f61cfaf32525f4c23f3c1c4e16',
          memo: 'hello world'
        })
      );*/

      /*let i = 10;
      this.interval = setInterval( () => {
        const trx = {
          type: 'transfer',
          from: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
          to: '04b87b0b0b3fd09106b5e3af3c1e176c8b47dfb1b4f540f1d8c6df85507ec35c98e20c008ac2621132f042158535c4ffac5778a14bbe4134c19581932d6208eee8',
          amount: i++,
          privateKey: '1eefe1060cee7c88a5f19253b11075d1d42e1fea5c8c6b65ceda1a290fdc6e16'
        };
        //console.log(trx);
        this.socket.send( JSON.stringify( trx ) );
        if( i === 100) clearInterval( this.interval );
      }, 1000);*/
    
    };
  }

  renderGraph = () => {
    d3.select('#svg').attr('height', this.state.blocks.length * 200 + 500);
    let circles = d3.select('#svg').selectAll('circle.block').data(this.state.blocks); 
    
    circles.enter().append('circle')
      .attr('class', 'block')
      .attr('cx', '20%')
      .attr('cy', (d,i) => { return i*200 + 50; })
      .attr('r', (d,i) => { return _.keys(d.transactions).length * this.circleSizeRate })
      .attr('fill', 'coral')
      .attr('stroke', 'white')
      .attr('stroke-width', 4);

    circles.exit().remove();
  }


  render() {
    this.renderGraph();

    return (
      <div className="explorer-graph">
        <svg id="svg"></svg>
      </div>
    )
  }
}