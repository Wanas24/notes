import React from 'react'
import Home from './Home'
import Login from './Login'

function ProtectedRoute() {
 if (localStorage.getItem('token')!=undefined){
    return <Home/>
 }else{
    return <Login/>
 }
}

export default ProtectedRoute