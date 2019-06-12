import React, { Component } from "react";
import moment from 'moment';
import { Item, List } from 'semantic-ui-react';
import _ from 'lodash';
import Transaction from './Transaction';

import '../css/Block.less';

export default class Block extends Component {
  constructor(props) {
      super(props);
  }

  render() {
		const { data } = this.props;

    return (
      <Item className="block">
        <Item.Content>
          <Item.Header as="h2">{data.hash}</Item.Header>
          <Item.Meta>
            timestamp: {moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a')}<br />
            transactions: {_.keys(data.transactions).length}
          </Item.Meta>
          <Item.Description>
            
						<List divided relaxed>
							{
								_.values(data.transactions).map( (tr) => {
									return (
										<Transaction key={tr.trx_id} data={tr} />
									)
								})
							}
	
  					</List>
				  
					</Item.Description>
          <Item.Extra></Item.Extra>
        </Item.Content>
      </Item>
    );
  }

}