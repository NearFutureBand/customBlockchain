import React, { Component } from "react";
import moment from 'moment';
import { List } from 'semantic-ui-react';

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
                <List.Header as='h3'>{data.trx_id}</List.Header>
                {opened &&
                    <List.Description>
                        timestamp: {moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a')}<br />
                        from: {data.from}<br />
                        to: {data.to}<br />
                        amount: {data.amount}<br />
                        signature: {data.signature}<br />
                    </List.Description>
                }
            </List.Content>
        </List.Item>
    );
  }

}