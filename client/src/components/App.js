import React, { Component } from "react";
import Main from "./taskapp/main/main.js";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      // Must wrap in BrowserRouter to utlize react-router-dom
      <BrowserRouter>
        <div>
          <Route path={process.env.PUBLIC_URL + "/"} component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
