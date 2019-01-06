import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Explorer from './Explorer';
import Client from './Client';
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
            <Route path="/" exact component={Client} />
            <Route path="/explorer" component={Explorer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;