import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import logo from '../../assets/img/logos/soundscape-hollow_white.png';

const Landing = () => {

  const auth = useSelector(state => state.auth)
  const innerRef=useRef()

  useEffect(()=>{
    setTimeout(()=>{
      if(innerRef.current){innerRef.current.classList.remove('zero-opacity')}
    },100)
  },[])

  return auth.isAuthenticated ? <Redirect to="/dashboard"/> 
  
  :
  
  (
    <div className="principal-container">

      <div ref={innerRef} className="landing-inner zero-opacity">
        <img className={"logo-main"} src={logo} alt="logo"/>
        <h3 className="medium purple">Welcome to Soundscape Online</h3>
        <h1 className="m-0">A PLACE FOR MUSIC LOVERS</h1>
        {
          !auth.isAuthenticated ? 

            <div className="flex-center">
              <Link to="/login" className="btn-blue">Sign in</Link>
              <Link to="/register" className="btn-purple">Create account</Link>
            </div>
          :
            <div className="flex-center">
              <Link to="/posts/discover" className="btn-purple">Discover music</Link>
              <Link to="/posts" className="btn-blue">Browse forums</Link>
              <Link to="/dashboard" className="btn-purple">Go to my profile</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default Landing



// <form onSubmit={(e)=>handleSubmit(e)}>
//   <input onChange={(e)=>handleChange(e)} value={email} type="email" name="email" />
//   <input onChange={(e)=>handleChange(e)} value={password} type="text" name="password" />
//   <button type="submit">go</button>
// </form>

// {/* <Link to="/dashboard"> dashboard </Link> */}
