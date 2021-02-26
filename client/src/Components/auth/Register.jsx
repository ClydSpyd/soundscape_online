import React, { useEffect, useRef, useState } from 'react'
import store from '../../store';
import { registerUser, clearError, setError } from '../../actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addAnimation } from '../../helpers/addAnimation';

const Register = () => {

  const [ formData, setFormData ] = useState({userName:'', email:'', password:''})
  const { email, password, userName } = formData;

  const auth = useSelector(state => state.auth)
  const formRef = useRef()
  const pass2Ref = useRef()

  const clear = () => {
    store.dispatch(clearError())
  }

  useEffect(()=>{ 
    setTimeout(()=>{
      if(formRef.current){formRef.current.classList.remove('zero-opacity')}
    },100)
    return ()=> { clear() }
  },[])

  const handleChange = (e) => {
    if(auth.error){ store.dispatch(clearError()) }
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const checkInput = () => {
    const inputs = Array.from(document.querySelectorAll('input'))
    return inputs.some(i => i.value==='')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(password !== pass2Ref.current.value || checkInput() ){

      addAnimation(formRef, 'shakeSlow', 500)
      if(password !== pass2Ref.current.value){ 
        return store.dispatch( setError('Passwords do no not match'))
      }

    }

    store.dispatch( registerUser({name:userName, email, password}) )
  }
  
  return auth.isAuthenticated ? 

    <Redirect to="/dashboard" /> 
  :

    (
      <div className="login">
        <div className="login-inner">
          <form ref={formRef} className="flex-center column zero-opacity" onSubmit={(e)=>handleSubmit(e)}>

            <Link to="/" className="close-circle" />
          <h2 className="blue">Register</h2>
          <p>Complete the form below and you'll be discovering new music in no time at all!</p>
            <input 
              onChange={(e)=>handleChange(e)}
              value={userName}
              placeholder={"name"}
              type="text" 
              name="userName"/>
            <input 
              onChange={(e)=>handleChange(e)}
              value={email}
              placeholder={"email"}
              type="email" 
              name="email"/>
            <input 
              value={password}
              onChange={(e)=>handleChange(e)}
              placeholder={"password"}
              type="password" 
              name="password"/>
            <input 
              ref={pass2Ref}
              placeholder={"confirm password"}
              type="password" 
              name="password2"/>

              <p className="error-text">{auth.error ? auth.error : '' }</p>

              <button className="btn-blue" type="submit">SIGN ME UP!</button>

              <p className="subtext purple">Already a member? Log in <Link onClick={clear} to="/login">here</Link> </p>
          </form>
        </div>
      </div>
    )
}

export default Register
