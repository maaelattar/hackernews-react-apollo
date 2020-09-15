import React from "react";
import "../App.css";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Navbar from "./Navbar";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./Login";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
      <div className="center w85">
        <Navbar />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
