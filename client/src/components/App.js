import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Explorer from './Explorer';
import Client from './Client';
import Header from './Header';

import HashMaker from "./HashMaker";
import '../css/App.less';


class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={HashMaker} />
            <Route path="/explorer" component={Explorer} />
            <Route path="/hash-maker" component={HashMaker} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;