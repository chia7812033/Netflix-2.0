import "../assets/HomeScreen.css";

import Banner from "./Banner";
import Navbar from "./Navbar";
import React from "react";

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Navbar />
      <Banner />
    </div>
  );
}

export default HomeScreen;
