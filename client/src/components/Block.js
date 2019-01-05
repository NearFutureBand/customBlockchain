import React, { Component } from "react";
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
          <Item.Meta>timestamp: {data.timestamp}</Item.Meta>
          <Item.Description>

						<List divided relaxed>
							{
								_.values(data.transactions).map( (tr) => {
									return (
										<Transaction key={tr.hash} data={tr} />
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