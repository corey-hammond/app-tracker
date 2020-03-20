import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./contacts/Dashboard";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <Dashboard />
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
