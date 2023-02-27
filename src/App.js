import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login";
import React from "react";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path='/' element={<HomeScreen />}></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
