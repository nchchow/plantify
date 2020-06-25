import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Upload from "./pages/Upload";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/feed" />
        </Route>
        <Route path="/feed" component={Feed} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/upload/new" component={Upload} exact />
      </Switch>
    </Router>
  );
}

export default App;
