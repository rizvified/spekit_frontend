import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import Favorites from "./pages/favorites.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='/favorites'>
          <Favorites />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
