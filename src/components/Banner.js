import "../assets/Banner.css";

import React from "react";

function Banner() {
  return (
    <header
      className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg')`,
        backgroundPosition: "center center",
      }}
    >

      <div className='banner__conetnts'>
        <h1 className='banner__title'>Name</h1>
        <div className='banner__buttons'>
          <button className='banner__buttons'>Play</button>
          <button className='banner__buttons'>My List</button>
        </div>
      </div>

      <h1 className='banner__description'>This is a description</h1>

      <div className="banner__fadeButton"></div>
    </header>
  );
}

export default Banner;
