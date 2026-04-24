import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Signup = () => {
  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [university, setUniversity]=useState("")
  const [password, setPassword]=useState("")
  const [confirm, setConfirm]=useState("")

  async function handleSignup(e){
  e.preventDefault();

  if(password !== confirm){
    alert("Password do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      university: university,
      createdAt: new Date()
    });

    console.log("User created:", user);

    window.location.href = "/feed";

  } catch (error) {
    alert(error.message);
  }
}

  return (
    <>
      <h1>Connexa</h1>
      <p>Join the Student Community</p>

      <section className="sign-up" onSubmit={handleSignup}>

        <form className="reg-form" id="signupForm">
          <h2>Create Account</h2>

          <label htmlFor="name">Name</label>
          <div className="input-box">
            <span className="icon">👤</span>
            <input 
              type="text" placeholder="John" id="name" required 
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>

          <label htmlFor="email">Email</label>
          <div className="input-box">
            <span class="icon">✉️</span>
            <input 
              type="email" placeholder="john@gmail.com" id="email" required
              onChange={(e)=>{setEmail(e.target.value)}} 
            />
          </div>

          <label htmlfor="university">University</label>
          <div className="input-box">
            <span className="icon">🎓</span>
            <input 
              type="text" placeholder="Graphic Era Hill University" id="university" required
              onChange={(e)=>{setUniversity(e.target.value)}}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-box">
            <span className="icon">🔒</span>
            <input 
              type="password" placeholder="Create a Password" id="password" required
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <label htmlFor="confirm">Confirm Password</label>
          <div className="input-box">
            <span className="icon">🔐</span>
            <input 
              type="password" placeholder="Confirm your Password" id="confirm" required
              onChange={(e)=>{setConfirm(e.target.value)}}
            />
          </div>

          <div className="create-account">
            <button type="submit" id="submit">Create Account</button>
          </div>

          <p className="notice">Already have a account? 
            <Link to="/">sign in</Link>
          </p>

        </form>
      </section>
      <script type="module" src="../script/register.js"></script>
    </>
  )
}

export default Signup
