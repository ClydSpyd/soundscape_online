import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { logout } from '../../actions/authActions'
import store from '../../store'

const NavBar = ({landing}) => {

  const auth = useSelector(state => state.auth)
  const history = useHistory()
  const handleLogout = () => { store.dispatch( logout(history) )}

  const authLinks = (
    <ul>
      <li><NavLink activeClassName="nav_active" to="/dashboard"><i className="fas fa-user"></i>{'  '} <span className="hide.sm">Dashboard</span></NavLink></li>
      <li><NavLink activeClassName="nav_active" to="/posts">Forums</NavLink></li>
      <li><NavLink activeClassName="nav_active" to="/inbox">Inbox</NavLink></li>
      <li> <a onClick={handleLogout} href="#!"> <i className="fas fa-sign-out-alt"></i>{' '} <span className="hide.sm">logout</span></a> </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="/posts">Forums</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register"><span className="hide.sm">Sign up</span></Link></li>
     
    </ul>
  )

  return landing && !auth.isAuthenticated ? null

  :
  
    (
      <nav className={`${'navbar bg-dark'} ${landing && 'landing'}`}>

        <Link to="/">
          <h4>soundscape</h4>
        </Link>

        { auth.isAuthenticated ? authLinks : guestLinks }

      </nav>
    )
}

export default NavBar
