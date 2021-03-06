import React, { Component } from "react";
import { Statistic } from 'semantic-ui-react';

import '../css/ExplorerStats.less';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = [
      { key: 'blocks', label: 'Blocks', value: this.props.data.blocks },
      { key: 'views', label: 'Transactions', value: this.props.data.trxs },
      { key: 'producer', label: 'Last block producer', value: 'virtualchain'}
    ]

    return (
      <div className="explorer-stats">
        <Statistic.Group
          items={items}
          widths="three"
          size="tiny"
        />
      </div>
    );
  }

}