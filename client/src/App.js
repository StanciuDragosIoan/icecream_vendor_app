import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/layout/navbar";
import IcecreamStore from "./components/pages/icecream-store";
// import UpdateIcecream from "./components/pages/update-icecream-stock";
import AddIcecream from "./components/pages/add-icecream";
import BuyIcecream from "./components/pages/buy-icecream";
import DeleteIcecream from "./components/pages/delete-icecream";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={IcecreamStore} />
        {/* <Route path="/edit/:id" component={UpdateIcecream} /> */}
        <Route path="/addIcecream" component={AddIcecream} />
        <Route path="/delete/:id" component={DeleteIcecream} />
        <Route path="/buy/:id" component={BuyIcecream} />

      </div>
    </Router>

  );
}

export default App;
