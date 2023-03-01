import "../assets/Profile.css";

import { logout, selectSubscription, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Navbar";
import Plans from "./Plans";
import React from "react";
import { auth } from "../db/firebase";
import { signOut } from "firebase/auth";

function Profile() {
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();
  const signOutUser = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <div className='profile'>
      <Navbar />
      <div className='profile__body'>
        <h1>Edit Profile</h1>
        <div className='profile__info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt='profile_image'
          />
          <div className='profile__detail'>
            <h3>{user.email}</h3>
            <div className='profile__currentPlan'>
              <h3>{`Plans (Current Plan: ${subscription?.role})`}</h3>
              <h4>{`Renewall Date: ${new Date(
                subscription?.current_period_end * 1000
              ).toLocaleDateString()}`}</h4>
              <Plans />
            </div>
            <div className='profile__plans'></div>
            <button onClick={signOutUser} className='profile__signOut'>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
