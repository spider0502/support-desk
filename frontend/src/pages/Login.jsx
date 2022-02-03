import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { name, email, password, password2 } = formData

    // Reducer
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // Redirect when login success
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value, }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return <>
        <section className="heading">
            <h1>
                <FaSignInAlt />Login
            </h1>
            <p>Please login to get support</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" id='email' className="form-control"
                        value={email} onChange={onChange} placeholder='Enter your email' required />
                </div>
                <div className="form-group">
                    <input type="password" id='password' className="form-control"
                        value={password} onChange={onChange} placeholder='Enter your password' required />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Login

