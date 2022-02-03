import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onClickLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            {user ? (
                <li>
                    <button className="btn" onClick={onClickLogout}>
                        <FaSignOutAlt></FaSignOutAlt>Logout
                    </button>
                </li>
            ) : (
                <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt></FaSignInAlt>Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser></FaUser>Register
                        </Link>
                    </li>
                </>
            )}

        </ul>
    </header>
}

export default Header
