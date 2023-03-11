import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    
    let navigate = useNavigate();
  
    function logout(){
        localStorage.removeItem('token')
        navigate('login')
    }
  return (
    
<nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Notes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        {
                    localStorage.getItem('token')? <> 
                <li onClick={logout} className="nav-item">
                    <Link to="login" className="nav-link">Logout</Link>
                </li>
                </>:<>
                <li className="nav-item">
                    <Link to="register" className="nav-link">Register</Link>
                </li><li className="nav-item">
                    <Link to="login" className="nav-link">Login</Link>
                </li></>
                  }
      </ul>
     
    </div>
  </div>
</nav>
  )
}
