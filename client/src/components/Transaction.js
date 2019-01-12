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
                <List.Header as='h3'>{data.trx_id} {data.type}</List.Header>
                { opened &&
                    <List.Description>
                        <span>timestamp: {moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        { data.to && <span>to: {data.to}</span> }
                        { data.nickname && <span>nickname: {data.nickname}</span> }
                        <span>from: {data.from}</span>
                        { data.amount && <span>amount: {data.amount}</span> }
                        <span>signature: {data.signature}</span>
                        <span>memo: {data.memo}</span>
                    </List.Description>
                }
            </List.Content>
        </List.Item>
    );
  }

}