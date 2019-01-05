import React, { Component } from "react";
import { Item, List } from 'semantic-ui-react';

import '../css/Transaction.less';

export default class Transaction extends Component {
  constructor(props) {
      super(props);
      
      this.state = {
          opened: false
      }
  }

  toggleTrx = () => {
    this.setState( (state) => {
        return { opened: !state.opened }
    });
  }

  render() {
    const { data } = this.props;
    const { opened } = this.state;

    return (
        <List.Item className="transaction" onClick={this.toggleTrx}>
            <List.Content>
                <List.Header as='h3'>{data.hash}</List.Header>
                {opened &&
                    <List.Description>
                        timestamp: {data.timestamp}<br />
                        from: {data.from}<br />
                        to: {data.to}<br />
                        amount: {data.amount}<br />
                    </List.Description>
                }
            </List.Content>
        </List.Item>
    );
  }

}