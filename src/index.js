import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./App";
import Profiledetails from "./components/Profiledetails";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const history = createBrowserHistory();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route path="/userDetails/:id">
          <Profiledetails />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
);
