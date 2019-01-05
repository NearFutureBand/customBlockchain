import React, { Component } from "react";
import { Statistic } from 'semantic-ui-react';

import '../css/Header.less';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = [
      { key: 'blocks', label: 'Blocks', value: this.props.data.blocks },
      { key: 'views', label: 'Transactions', value: 12312314 },
      { key: 'producer', label: 'Last block producer', value: 'virtualchain'}
    ]

    return (
      <header>
        <Statistic.Group
          items={items}
          widths="three"
          size="tiny"
        />
      </header>
    );
  }

}