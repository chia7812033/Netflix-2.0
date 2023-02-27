import "../assets/Login.css";

import React, { useState } from "react";

import SignIn from "./SignIn";

function Login() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className='login'>
      <div className='login__background'>
        <img
          className='login__logo'
          src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
          alt='netlfix-logo'
        />
        <button className='login__signIn' onClick={() => setSignIn(true)}>
          Sign in
        </button>
        <div className='login__gradient' />
      </div>

      <div className='login__body'>
        {signIn ? (
          <SignIn />
        ) : (
          <>
            <h1>Unlimited films, TV programs and more.</h1>
            <h2>Watch anywhere, Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className='login__input'>
              <form>
                <input type='email' placeholder='Email Address' />
                <button
                  type='submit'
                  className='login__getStarted'
                  onClick={() => setSignIn(true)}
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
