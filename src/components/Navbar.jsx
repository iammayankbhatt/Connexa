import React from 'react'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
        <div className="navbar">

            <div className="option">
                
            <h1 className="connexa">Connexa</h1>


            <Link className='text' to='/feed'><span>🏠</span> <span>Feed</span></Link>
            <Link className='text' to='/Match'><span>👥</span> <span>Match</span></Link>
            <Link className='text' to='/feed'><span>🧭</span> <span>Discover</span></Link>
            <Link className='text' to='/feed'> <span>💬</span><span>Chat</span></Link>
            <Link className='text' to='/feed'><span>👤</span> <span>Profile</span></Link>

            </div>

            <div>
                <input type="text"></input>
            </div>


            {/* <Link className='text' to='/feed'>Feed</Link> */}
            {/* <h1>Feed</h1>
            <h1>Match</h1>
            <h1>Discover</h1>
            <h1>Chat</h1>
            <h1>Profile</h1> */}
        </div>
  )
}

export default Navbar
