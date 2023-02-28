import "../assets/SignUp.css";

import React, { useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../db/firebase";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        dispatch(
          login({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        dispatch(
          login({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className='signIn'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='Email' type='email' />
        <input ref={passwordRef} placeholder='Password' type='password' />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className='signIn__gray'>New to Netflix?</span>
          <span className='signIn__link' onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUp;
