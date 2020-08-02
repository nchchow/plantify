import React, { useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(sessionStorage.isLoggedIn)
  );

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/feed" />
        </Route>
        <Route path="/feed" component={Feed} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/login"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/upload/new" component={Upload} exact />
      </Switch>
    </Router>
  );
}

export default App;
