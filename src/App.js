import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import Favorites from "./pages/favorites.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/favorites'>
          <Favorites />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
