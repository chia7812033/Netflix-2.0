import "./App.css";

import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { auth } from "./db/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe();
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path='/profile' element={<Profile />}></Route>
            <Route exact path='/' element={<HomeScreen />}></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
