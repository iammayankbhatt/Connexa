import React, { useState } from 'react'
import '../../styles/registration.css'
import {Link} from "react-router-dom"
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]=useState("");

  function fun(e){
    e.preventDefault();
    console.log(password);
  }

  function handleLogin(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        console.log("Login success:",userCredential.user);

        window.location.href="/feed";
      })
      .catch((error)=>{
        alert(error.message);
      });
  }

  return (
    <>
      <h1 id="in">Connexa</h1>
      <p>Study Networking Platform</p>
      <section className="login">
        <form className="reg-form" id="loginForm" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <label htmlFor='email'>Email</label>
          <div className="input-box">
            <span className="icon">👤</span>
            <input 
              type="email" placeholder="john@gmail.com" id="email" required 
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-box">
            <span className="icon">🔒</span>
            <input 
              type="password" placeholder="Enter a Password" id="password" required 
              onChange={(e)=>setPassword(e.target.value)}
              />
          </div>

          <div className="signIn">
            <button type="submit" id="submit">Sign In</button>
          </div>
          <hr />
          <p className="notice">Don't have an account?
            <Link to="/Signup">sign up</Link>
        </p>
            

        </form>
      </section>
    </>
  )
}

export default Login

