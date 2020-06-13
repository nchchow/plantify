import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";

function App() {
  return (
    <Router>
      <Header />
      <Hero />
      <Catalog />
    </Router>
  );
}

export default App;
