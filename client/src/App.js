import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Catalog from "./components/Catalog";

function App() {
  return (
    <Router>
      <Header />
      <Catalog />
    </Router>
  );
}

export default App;
