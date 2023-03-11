import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    let navigate=useNavigate()

const[user,setUser]=useState({
    "first_name":'',
    "last_name":'',
    "email":'',
    "password":''
})
const[isLoading,setIsLoading]=useState(false)
const[error,setError]=useState('')
const[message,setMessage]=useState('')

function getUserData({target}){
    setUser({...user,[target.name]:target.value})
}


async function register(e){
e.preventDefault()
setError('')
setMessage('')
setIsLoading(true)
console.log(user)

let {data} = await axios.post('https://sticky-note-fe.vercel.app/signup',user)
setIsLoading(false)
if (data.message=='success'){
setMessage(data.message)
navigate('/login')
}
else{
    
    setError(data.message)
}
console.log(data)
}



  return (
    <div className="container my-5 py-5">
      <div className="col-md-5 m-auto text-center">
          <form onSubmit={register} >
              <div className="form-group">
                  <input onChange={getUserData}  placeholder="Enter your First name" name="first_name" type="text" className=" form-control" />
              </div>
              <div className="form-group my-2 ">
                  <input onChange={getUserData} placeholder="Enter your Last name" name="last_name" type="text" className="form-control" />
              </div>
              <div className="form-group">
                  <input onChange={getUserData}  placeholder="Enter email" type="email" name="email" className="form-control" />
              </div>
              <div className="form-group my-2">
                  <input onChange={getUserData}  placeholder="Enter you password" type="password" name="password" className=" form-control" />
              </div>
              <button type="submit" className={'btn btn-info w-100'+(isLoading?" disabled":"")}> {isLoading?<i className='fa fa-spinner fa-spin' aria-hidden="true"></i>:"sign up"} </button>
                {error&&<div className='alert alert-danger mt-2'>{error}</div>}
                {message&&<div className='alert alert-success mt-2'>{message}</div>}
             
          </form>
      </div>
  </div>
  )
}
