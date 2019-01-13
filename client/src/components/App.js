import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Explorer from './Explorer';
import ExplorerGraph from './ExplorerGraph';
import Header from './Header';
import TransactionCreator from './TransactionCreator';
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
            <Route path="/" exact component={ExplorerGraph} />
            <Route path="/explorer" component={Explorer} />
            <Route path="/hash-maker" component={HashMaker} />
            <Route path="/explorer-graph" component={ExplorerGraph} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;