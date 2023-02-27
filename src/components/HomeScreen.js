import "../assets/HomeScreen.css";

import Banner from "./Banner";
import Navbar from "./Navbar";
import React from "react";
import Row from "./Row"
import requests from "../helpers/Requests";

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Navbar />
      <Banner />

      <Row title='Netflix Originals' fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror Movie' fetchUrl={requests.fetchHorrirMovies} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocmentaries} />
    </div>
  );
}

export default HomeScreen;
