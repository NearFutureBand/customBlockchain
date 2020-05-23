import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/Header.less';

export default class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link to="/explorer">Explorer</Link>
        <Link to="/hash-maker">Hash maker</Link>
      </header>
    )
  }
}